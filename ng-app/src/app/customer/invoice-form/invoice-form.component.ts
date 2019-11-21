import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

enum InvoiceStatus {
  Open,
  Issued,
  Confirmed,
  Paid,
  Closed,
  Cancelled
}

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  formData: any = {};
  includes = ['customer', 'eventPlan'];
  fields = [
    // { name: 'code', type: 'string', required: true },
    { name: 'customer', type: 'ref', required: true },
    { name: 'eventPlan', type: 'ref' },
    { name: 'status', type: 'enum', enum: InvoiceStatus, default: InvoiceStatus[InvoiceStatus.Open], required: true },
    { name: 'remarks', type: 'textarea' },
    {
      name: 'lines',
      type: 'table',
      displayName: 'Invoice Items',
      fields: [
        { name: 'name', type: 'string', required: true },
        { name: 'unit', type: 'string', required: true },
        { name: 'unitPrice', type: 'number', required: true },
        { name: 'quantity', type: 'number', required: true }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['eventPlan']) {
        const getEventPlan$ = this.http.get<{ data }>(environment.apiUrl + '/service/event-plan/' + params['eventPlan']).subscribe({
          next: ({ data }) => {
            this.formData.eventPlan = data;
          },
          complete: () => {
            getEventPlan$.unsubscribe();
          }
        });
      }
      if (params['customer']) {
        const getCustomer$ = this.http.get<{ data }>(environment.apiUrl + '/service/customer/' + params['customer']).subscribe({
          next: ({ data }) => {
            this.formData.customer = data;
          },
          complete: () => {
            getCustomer$.unsubscribe();
          }
        });
      }
    });
  }
}
