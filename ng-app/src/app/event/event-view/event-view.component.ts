import { DialogFormComponent } from '../../templates/dialog-form/dialog-form.component';
import { ToastrService } from 'ngx-toastr';
import { StandardFunctionsService } from './../../standard/standard-functions.service';
import { Component, OnInit } from '@angular/core';
import { StandardService } from 'src/app/standard/standard.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { IQueryModel } from 'src/app/interfaces/query-model';
import { PageLoaderService } from 'src/app/templates/page-loader/page-loader.service';
import * as moment from 'moment';

enum EventProcessType {
    Initial,
    Preparation,
    Schedule,
    Closure,
    Other
}

@Component({
    selector: 'app-event-view',
    templateUrl: './event-view.component.html',
    styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
    formData: any = {};
    registrationForm: any;
    formService: StandardService;

    includes: string[] = [
        'services.providerService',
        'facilities.providerFacility',
        'stockItems.stockItem',
        'processes.provider',
        'processes.providerService',
        'processes.providerFacility'
    ];

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
        { name: 'qrcode', format: 'template', template: item => `<qrcode qrdata="${item.code}" [size]="256" [level]="'H'"></qrcode>` },
        { name: 'name' },
        { name: 'attendeeGroup.name', displayName: 'Group' },
        // { name: 'event.name', displayName: 'Event' },
        { name: 'remarks' }
    ];
    filterList = [{ type: 'code', queryType: 'string' }, { type: 'name', queryType: 'string' }, { type: 'remarks', queryType: 'string' }];

    queryModel = {
        filters: []
    };

    eventService: StandardService;

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        public functions: StandardFunctionsService,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private pageLoaderService: PageLoaderService
    ) {
        // this.service.init('event');
        this.eventService = new StandardService(this.http, this.dialog, this.router, this.toastr);
        this.formService = new StandardService(this.http, this.dialog, this.router, this.toastr);
        this.formService.init('registration-form');
        this.eventService.init('event');
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.route.params.subscribe(
            (params: Params) => {
                if (params['id']) {
                    this.pageLoaderService.toggle(true);
                    this.eventService.fetch(params['id'], null, this.includes).subscribe((res: any) => {
                        this.formData = res.data;
                        this.fetchRegistrationForm(this.formData._id);
                        this.pageLoaderService.toggle(false);
                    });

                    this.queryModel.filters.push({ type: 'event', queryType: 'match', searchText: params['id'] });
                }
            },
            (res: any) => {
                this.pageLoaderService.toggle(false);
                this.toastr.error(res.error.message);
            }
        );
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
        const dialogRef = this.dialog.open(DialogFormComponent, {
            width: 'auto',
            minWidth: '50vw',
            maxHeight: '99vh',
            data: { domain: 'event', data: formData, fields, title: dName }
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
                    { name: 'processType', type: 'enum', enum: EventProcessType, default: EventProcessType[EventProcessType.Schedule] },
                    {
                        name: 'type',
                        type: 'enum',
                        enumList: [{ key: 'Service', value: 'Service' }, { key: 'Facility', value: 'Facility' }]
                    },
                    { name: 'provider', type: 'ref' },
                    {
                        name: 'providerService',
                        displayName: 'Service',
                        type: 'ref',
                        isShow: (formData: any) => formData.type === 'Service'
                    },
                    {
                        name: 'providerFacility',
                        displayName: 'Facility',
                        type: 'ref',
                        isShow: (formData: any) => formData.type === 'Facility'
                    },
                    { name: 'startFromDate', type: 'date', required: true },
                    { name: 'startFromTime', type: 'time', required: true },
                    { name: 'endToDate', type: 'date', required: true },
                    { name: 'endToTime', type: 'time', required: true },
                    { name: 'remarks', type: 'textarea' }
                ]
            }
        ];

        const dialogRef = this.dialog.open(DialogFormComponent, {
            width: 'auto',
            minWidth: '50vw',
            maxHeight: '99vh',
            data: { domain: 'event', data: formData, fields, title: 'Event Processes' }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.refresh();
        });
    }

    getDuration(process) {
        let from;
        let fromTime;
        let to;
        let toTime;
        const durationMonths = moment(process.endToDate).diff(moment(process.startFromDate), 'months');

        if (durationMonths > 0) {
            from = moment(process.startFromDate).format('DD MMM');
            fromTime = moment(process.startFromTime).format('HH:mm A');
            to = moment(process.endToDate).format('DD MMM YY');
            toTime = moment(process.endToTime).format('HH:mm A');
        } else {
            from = moment(process.startFromDate).format('DD');
            fromTime = moment(process.startFromTime).format('HH:mm A');
            to = moment(process.endToDate).format('DD MMM YY');
            toTime = moment(process.endToTime).format('HH:mm A');
        }

        if (process.processType === EventProcessType[EventProcessType.Schedule]) {
            return `${from}-${to} [${fromTime} - ${toTime}]`;
        }

        return `${from}-${to}`;
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

    changeStatus(process, status) {
        process.status = status;
        this.eventService.submit(this.formData).subscribe(_ => {
            this.toastr.info('Updated Status Succesfully!');
            this.refresh();
        });
    }

    // source: https://stackoverflow.com/questions/49102724/angular-5-copy-to-clipboard
    copyRegistrationFormLink(formId) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = `http:/localhost:4200/register/${formId}`;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.toastr.info('Copied to clipboard!');
    }

    sendRegistrationFormLink(formId) {
        const formData = {};
        const fields = [{ name: 'email', type: 'string', required: true }];

        const dialogRef = this.dialog.open(DialogFormComponent, {
            width: 'auto',
            minWidth: '50vw',
            maxHeight: '99vh',
            data: { domain: 'registration-form', data: formData, fields, title: 'Send Registration Form Link', callback: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.pageLoaderService.toggle(true);
            const url = this.formService.apiUrl + '/sendRegistrationFormLink';
            this.formService.submit({ formId, email: result.email }, url).subscribe(_ => {
                this.pageLoaderService.toggle(false);
                this.toastr.info('Sent link to the email!');
            });
        });
    }
}
