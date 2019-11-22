import { Component, OnInit } from '@angular/core';
import { IStandardFormField } from 'src/app/standard/standard.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

enum PaymentStatus {
  Open,
  Verified,
  Cancelled,
  Failed,
  Closed
}

enum PaymentType {
  Cash,
  Cheque,
  BankTransfer,
}

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  formData: any = {};
  includes = ['provider', 'receipt', 'eventPlan'];
  fields: IStandardFormField[] = [
    { name: 'provider', type: 'ref', required: true },
    { name: 'eventPlan', type: 'ref', required: true },
    { name: 'supplierInvoice', type: 'ref', refName: 'code', required: true },
    { name: 'status', type: 'enum', enum: PaymentStatus, default: PaymentStatus[PaymentStatus.Open] },
    { name: 'amount', type: 'number', required: true },
    { name: 'paymentType', type: 'enum', enum: PaymentType, default: PaymentType[PaymentType.Cash] },
    { name: 'chequeInfo', type: 'object', isShow: item => item.paymentType === PaymentType[PaymentType.Cheque], fields: [
      { name: 'referenceNumber', type: 'string', required: true },
      { name: 'payeeName', type: 'string', required: true },
      { name: 'payeeIdentityNumber', type: 'string', required: true },
      { name: 'draweeName', type: 'string', required: true },
      { name: 'draweeIdentityNumber', type: 'string', required: true },
      { name: 'issuedDate', type: 'date', required: true },
    ]},
    { name: 'bankTransferInfo', type: 'object', isShow: item => item.paymentType === PaymentType[PaymentType.BankTransfer], fields: [
      { name: 'referenceNumber', type: 'string', required: true },
      { name: 'bank', type: 'string', required: true },
      { name: 'accountNumber', type: 'string', required: true },
      { name: 'payeeName', type: 'string', required: true },
      { name: 'payeeIdentityNumber', type: 'string', required: true },
      { name: 'transferedDate', type: 'date', required: true },
    ]},
    { name: 'remarks', type: 'textarea' },
  ];

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private http: HttpClient) {}

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
      if (params['provider']) {
        const getEventPlan$ = this.http.get<{ data }>(environment.apiUrl + '/service/provider/' + params['provider']).subscribe({
          next: ({ data }) => {
            this.formData.provider = data;
          },
          complete: () => {
            getEventPlan$.unsubscribe();
          }
        });
      }
    });
  }
}
