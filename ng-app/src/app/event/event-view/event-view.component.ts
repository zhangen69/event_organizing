import { StandardFunctionsService } from './../../standard/standard-functions.service';
import { Component, OnInit, Inject } from '@angular/core';
import { StandardService } from 'src/app/standard/standard.service';
import { Params, ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { IStandardFormField } from 'src/app/standard/standard-form-field.interface';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  formData: any = {};
  includes: string[] = [
    'services.providerService',
    'facilities.providerFacility',
    'stockItems.stockItem'
  ];
  testdate = null;

  columns = [
    { name: 'code', format: 'link', link: '/attendee/view/' },
    { name: 'name' },
    { name: 'attendeeGroup.name', displayName: 'Group' },
    { name: 'event.name', displayName: 'Event' },
    { name: 'remarks' },
  ];
  filterList = [
    { type: 'name', queryType: 'string' },
    { type: 'remarks', queryType: 'string' },
  ];

  queryModel = {
    filters: []
  };

  constructor(
    private service: StandardService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public functions: StandardFunctionsService
  ) { }

  ngOnInit() {
    this.service.init('event');
    this.refresh();
  }

  refresh() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.service
          .fetch(params['id'], null, this.includes)
          .subscribe((res: any) => {
            this.formData = res.data;
          });

        this.queryModel.filters.push({ type: 'event', queryType: 'match', searchText: params['id'] });
      }
    });
  }

  addItemToEvent(type, name) {
    const formData = JSON.parse(JSON.stringify(this.formData));
    const dName = `Event ${name.replace(/^\w/, c => c.toUpperCase())}`;
    const cName = `Event ${dName.substring(0, dName.length - 1)} Item`;
    const obj = this.reformItem({
      name,
      displayName: dName,
      childName: cName,
      fieldName: type
    });
    const fields = [obj];

    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(EventAddItemDialogComponent, {
      width: 'auto',
      maxHeight: '99vh',
      data: { event: formData, fields, title: dName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  addEventProcessToEvent() {
    const formData = JSON.parse(JSON.stringify(this.formData));
    const fields = [
      {
        name: 'processes', type: 'array', displayName: 'Event Process Items', childName: 'Process Item', fields: [
          { name: 'name', type: 'string', required: true },
          { name: 'startFrom', type: 'date', required: true },
          { name: 'endTo', type: 'date', required: true },
          { name: 'remarks', type: 'textarea' },
        ]
      }
    ];
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(EventAddItemDialogComponent, {
      width: 'auto',
      maxHeight: '99vh',
      data: { event: formData, fields, title: 'Event Processes' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  private reformItem({ name, displayName, childName, fieldName }) {
    return {
      name,
      displayName,
      type: 'array',
      childName,
      fields: [
        { name: fieldName, type: 'ref', required: true },
        { name: 'quantity', type: 'number', required: true },
        { name: 'remarks', type: 'textarea' }
      ]
    };
  }
}

@Component({
  selector: 'app-event-add-item-dialog',
  templateUrl: './event-add-item-dialog.html'
})
export class EventAddItemDialogComponent implements OnInit {
  formData: any = {};
  fields: IStandardFormField[];

  constructor(
    private dialogRef: MatDialogRef<EventAddItemDialogComponent>,
    private service: StandardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.service.init('event');
    this.fields = this.data.fields;
    this.formData = this.data.event;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
