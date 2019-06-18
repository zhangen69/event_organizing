import { Component, OnInit, Inject } from '@angular/core';
import { StandardService } from 'src/app/standard/standard.service';
import { Params, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IStandardFormField } from 'src/app/standard/standard-form-field.interface';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  formData: any = {};
  includes: string[] = ['services.providerService', 'facilities.providerFacility'];

  constructor(private service: StandardService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.service.init('event');
    this.refresh();
  }

  refresh() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.service.fetch(params['id'], null, this.includes).subscribe((res: any) => {
          this.formData = res.data;
        });
      }
    });
  }

  addItemToEvent(type, name) {
    const dName = `Event ${name.replace(/^\w/, c => c.toUpperCase())}`;
    const cName = `Event ${dName.substring(0, dName.length - 1)} Item`;
    const obj = this.reformItem({ name, displayName: dName, childName: cName, fieldName: type });
    const fields = [obj];

    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(EventAddItemDialogComponent, {
      width: 'auto',
      maxHeight: '99vh',
      data: { event: this.formData, fields, title: dName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  private reformItem({ name, displayName, childName, fieldName }) {
    return { name, displayName, type: 'array', childName, fields: [
      { name: fieldName, type: 'ref', required: true },
      { name: 'quantity', type: 'number', required: true },
      { name: 'remarks', type: 'textarea' },
    ]};
  }

}

@Component({
  selector: 'app-event-add-item-dialog',
  templateUrl: './event-add-item-dialog.html',
})
export class EventAddItemDialogComponent implements OnInit {
  formData: any = {};
  fields: IStandardFormField[];

  constructor(
    private dialogRef: MatDialogRef<EventAddItemDialogComponent>,
    private service: StandardService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.service.init('event');
    this.fields = this.data.fields;
    this.formData = this.data.event;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
