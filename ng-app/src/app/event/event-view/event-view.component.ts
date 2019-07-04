import { ToastrService } from 'ngx-toastr';
import { StandardFunctionsService } from './../../standard/standard-functions.service';
import { Component, OnInit, Inject } from '@angular/core';
import { StandardService } from 'src/app/standard/standard.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IStandardFormField } from 'src/app/standard/standard-form-field.interface';
import { HttpClient } from '@angular/common/http';
import { IQueryModel } from 'src/app/interfaces/query-model';
import { PageLoaderService } from 'src/app/templates/page-loader/page-loader.service';

@Component({
    selector: 'app-event-view',
    templateUrl: './event-view.component.html',
    styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
    formData: any = {};
    registrationForm: any;
    formService: StandardService;

    includes: string[] = ['services.providerService', 'facilities.providerFacility', 'stockItems.stockItem', 'processes.provider', 'processes.providerService', 'processes.providerFacility'];

    actions = [
        {
            name: 'Group Attendees',
            format: 'function',
            function: selectedItems => {
                console.log('triggered function', selectedItems);
            },
            isMultiple: true
        }
    ];
    columns = [
        { name: 'code', format: 'link', link: '/attendee/view/' },
        { name: 'name' },
        { name: 'attendeeGroup.name', displayName: 'Group' },
        // { name: 'event.name', displayName: 'Event' },
        { name: 'remarks' }
    ];
    filterList = [{ type: 'code', queryType: 'string' }, { type: 'name', queryType: 'string' }, { type: 'remarks', queryType: 'string' }];

    queryModel = {
        filters: []
    };

    constructor(
        private service: StandardService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        public functions: StandardFunctionsService,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private pageLoaderService: PageLoaderService
    ) {
        this.service.init('event');
        this.formService = new StandardService(this.http, this.dialog, this.router, this.toastr);
        this.formService.init('registration-form');
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.pageLoaderService.toggle(true);
                this.service.fetch(params['id'], null, this.includes).subscribe((res: any) => {
                    this.formData = res.data;
                    this.fetchRegistrationForm(this.formData._id);
                    this.pageLoaderService.toggle(false);
                });

                this.queryModel.filters.push({ type: 'event', queryType: 'match', searchText: params['id'] });
            }
        });
    }

    fetchRegistrationForm(eventId: string) {
        const queryModel: IQueryModel = { pageSize: 0, currentPage: 0, searchText: eventId, type: 'event', queryType: 'match' };
        this.formService.fetchAll(queryModel).subscribe((res: any) => {
            if (res.data.length > 0) {
                this.registrationForm = res.data[0];
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
                name: 'processes',
                type: 'table',
                displayName: 'Event Process Items',
                childName: 'Process Item',
                fields: [
                    { name: 'name', type: 'string', required: true },
                    {
                        name: 'type',
                        type: 'enum',
                        enumList: [{ key: 'Service', value: 'Service' }, { key: 'Facility', value: 'Facility' }]
                    },
                    { name: 'provider', type: 'ref' },
                    { name: 'providerService', type: 'ref', isShow: (formData: any) => formData.type === 'Service' },
                    { name: 'providerFacility', type: 'ref', isShow: (formData: any) => formData.type === 'Facility' },
                    { name: 'startFromDate', type: 'date', required: true },
                    { name: 'startFromTime', type: 'time', required: true },
                    { name: 'endToDate', type: 'date', required: true },
                    { name: 'endToTime', type: 'time', required: true },
                    { name: 'remarks', type: 'textarea' }
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
            type: 'table',
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
    ) {}

    ngOnInit(): void {
        this.service.init('event');
        this.fields = this.data.fields;
        this.formData = this.data.event;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
