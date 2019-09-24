import { HttpClient } from '@angular/common/http';
import { IStandardColumn, IStandardFormField } from './../../standard/standard.interface';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event-plan-list',
  templateUrl: './event-plan-list.component.html',
  styleUrls: ['./event-plan-list.component.css']
})
export class EventPlanListComponent implements OnInit {
  @ViewChild('generateEventForm', { static: true })
  generateEventForm: TemplateRef<any>;
  actions = [
    {
      name: 'Generate Event',
      format: 'function',
      function: item => {
        this.generateEventFormData = {
          name: item.name,
          eventPlan: item._id,
          services: item.services,
          facilities: item.facilities,
          stockItems: item.stockItems,
        };

        const dialogForm = this.dialog.open(this.generateEventForm, { minWidth: '500px', disableClose: true });

        dialogForm.afterClosed().subscribe((val) => {
          if (val) {
            this.http.post(environment.apiUrl + '/service/event', this.generateEventFormData).pipe(
              map((res: any) => res.data)
            ).subscribe(() => {
              this.generateEventFormData = null;
              this.toastr.success('Generated new event successfully!');
            });
          }
        });
      }
    }
  ];
  columns: IStandardColumn[] = [
    { name: 'name', displayName: 'Name' },
    { name: 'totalBudgetAmount', displayName: 'Total Budget (RM)', type: 'currency' },
    { name: 'remarks', displayName: 'Remarks' },
    { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
    { type: 'name', display: 'Name', queryType: 'string' },
    { type: 'remarks', display: 'Remarks', queryType: 'string' },
  ];
  generateEventFormFields: IStandardFormField[] = [
    { name: 'name', type: 'string' },
    { name: 'customer', type: 'ref' },
    { name: 'dateFrom', type: 'date' },
    { name: 'timeFrom', type: 'time' },
    { name: 'dateTo', type: 'date' },
    { name: 'timeTo', type: 'time' },
    { name: 'venue', type: 'textarea' },
  ];
  generateEventFormData: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() { }

}
