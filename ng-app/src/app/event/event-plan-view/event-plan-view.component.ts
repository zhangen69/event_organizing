import { HttpResponse } from './../../standard/standard.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLoaderService } from 'src/app/templates/page-loader/page-loader.service';
import { StandardService } from 'src/app/standard/standard.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogFormComponent } from 'src/app/templates/dialog-form/dialog-form.component';
import * as moment from 'moment';

enum EventProcessType {
  'Initial', 'Preparation', 'Setup', 'Schedule', 'Closed'
}

enum EventProcessStatus {
  'Open', 'In Progress', 'Done', 'Verified', 'Closed'
}

@Component({
  selector: 'app-event-plan-view',
  templateUrl: './event-plan-view.component.html',
  styleUrls: ['./event-plan-view.component.css']
})
export class EventPlanViewComponent {
  eventPlan: any = {};
  eventPlanService: StandardService;
  filteredEventProcesses: any[] = [];
  selectProcessStatus = '';
  eventPlanStatus: string[] = ['Initial', 'Preparation', 'In Progress', 'Closed'];

  constructor(private route: ActivatedRoute, private http: HttpClient, private pageLoaderService: PageLoaderService, private dialog: MatDialog, private router: Router, private toastr: ToastrService) {
    this.eventPlanService = new StandardService(this.http, this.dialog, this.router, this.toastr);
    this.eventPlanService.init('event-plan');
    this.refresh();

    // of(Object.keys(EventPlanStatus)).pipe(
    //   map(keys => keys.slice(keys.length / 2))
    // ).subscribe(status => this.eventPlanStatus = status);
  }

  refresh() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.pageLoaderService.toggle(true);
        const includes = ['customer', 'services.provider', 'services.providerService', 'facilities.provider', 'facilities.providerFacility', 'processes.provider'];
        this.http.get<HttpResponse>(environment.apiUrl + '/service/event-plan/' + params['id'] + '?includes=' + includes.join()).pipe(
          map(res => res.data),
        ).subscribe(data => {
          this.eventPlan = data;
          // sort: formData.processes
          this.eventPlan.processes.sort((a, b) => (a.order > b.order ? -1 : a.order === b.order ? 0 : 1));
          this.filterProcesses(this.selectProcessStatus);
          this.pageLoaderService.toggle(false);
        });
      }
    });
  }

  addItemToEvent(type, name) {
    const eventPlan = JSON.parse(JSON.stringify(this.eventPlan));
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
      data: { domain: 'event-plan', data: eventPlan, callback: true, fields, title: dName }
    });

    dialogRef.afterClosed().subscribe(event => {
      event[name].forEach(element => {
        element.name = element[type].name;
        element.unit = element[type].unit;
        element.unitPrice = element[type].unitPrice;
      });
      this.eventPlanService.submit(event).subscribe(_ => {
        this.refresh();
      });
    });
  }

  addEventProcessToEvent() {
    const eventPlan = JSON.parse(JSON.stringify(this.eventPlan));
    const fields = [
      {
        name: 'processes',
        type: 'table',
        displayName: 'Event Process Items',
        childName: 'Process Item',
        fields: [
          { name: 'name', type: 'string', required: true },
          { name: 'type', type: 'enum', enum: EventProcessType, default: EventProcessType[EventProcessType.Schedule] },
          {
            name: 'processType',
            type: 'enum',
            enumList: [{ key: 'Service', value: 'Service' }, { key: 'Facility', value: 'Facility' }]
          },
          { name: 'provider', type: 'ref' },
          {
            name: 'providerService',
            displayName: 'Service',
            type: 'ref',
            isShow: (eventPlan: any) => eventPlan.processType === 'Service'
          },
          {
            name: 'providerFacility',
            displayName: 'Facility',
            type: 'ref',
            isShow: (eventPlan: any) => eventPlan.processType === 'Facility'
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
      data: { domain: 'event-plan', data: eventPlan, fields, title: 'Event Processes' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }


  changeStatus(process, status) {
    process.status = status;
    this.eventPlanService.submit(this.eventPlan).subscribe(_ => {
      this.toastr.info('Updated Status Succesfully!');
      this.refresh();
    });
  }

  filterProcesses(status?: string) {
    this.selectProcessStatus = status;
    if (!status) {
      this.filteredEventProcesses = this.eventPlan.processes;
    } else {
      this.filteredEventProcesses = this.eventPlan.processes.filter(val => val.status === status);
    }
    this.filteredEventProcesses.sort((a, b) => (a.order > b.order ? -1 : a.order === b.order ? 0 : 1));
  }

  onMoveUpPosition(item, itemIndex) {
    const targetItem = this.eventPlan.processes[itemIndex];
    const swapItem = this.eventPlan.processes[itemIndex - 1];

    targetItem.order += targetItem.order <= swapItem.order ? 1 : 0;
    swapItem.order -= targetItem.order === swapItem.order ? 1 : 0;

    this.eventPlanService.submit(this.eventPlan).subscribe(_ => {
      this.toastr.info('Moved Process ' + item.name);
      this.refresh();
    });
  }

  onMoveDownPosition(item, itemIndex) {
    const targetItem = this.eventPlan.processes[itemIndex];
    const swapItem = this.eventPlan.processes[itemIndex + 1];

    targetItem.order = targetItem.order >= swapItem.order ? swapItem.order : targetItem.order;
    swapItem.order = targetItem.order <= swapItem.order ? swapItem.order + 1 : targetItem.order - 1;

    this.eventPlanService.submit(this.eventPlan).subscribe(_ => {
      this.toastr.info('Moved Process ' + item.name);
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



}
