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

  constructor(private route: ActivatedRoute, private http: HttpClient, private pageLoaderService: PageLoaderService, private dialog: MatDialog, private router: Router, private toastr: ToastrService) {
    this.eventPlanService = new StandardService(this.http, this.dialog, this.router, this.toastr);
    this.eventPlanService.init('event-plan');
    this.refresh();
  }

  refresh() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.pageLoaderService.toggle();
        const includes = ['customer', 'services.provider', 'facility.provider'];
        this.http.get<HttpResponse>(environment.apiUrl + '/service/event-plan/' + params['id'] + '?includes=' + includes.join()).pipe(
          map(res => res.data),
        ).subscribe(data => {
          this.eventPlan = data;
          // sort: formData.processes
          this.eventPlan.processes.sort((a, b) => (a.order > b.order ? -1 : a.order === b.order ? 0 : 1));
          this.filterProcesses(this.selectProcessStatus);
          this.pageLoaderService.toggle();
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
      data: { domain: 'event', data: eventPlan, callback: true, fields, title: dName }
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

  filterProcesses(status?: string) {
    this.selectProcessStatus = status;
    if (!status) {
      this.filteredEventProcesses = this.eventPlan.processes;
    } else {
      this.filteredEventProcesses = this.eventPlan.processes.filter(val => val.status === status);
    }
    this.filteredEventProcesses.sort((a, b) => (a.order > b.order ? -1 : a.order === b.order ? 0 : 1));
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
