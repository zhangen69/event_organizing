import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  includes: string[] = ['provider', 'customer', 'eventPlan', 'supplierInvoice', 'invoice'];
  columns: IStandardColumn[] = [
    { name: 'code' },
    { name: 'provider.name', displayName: 'Provider' },
    { name: 'customer.name', displayName: 'Customer' },
    {
      name: 'invoice.code',
      displayName: 'Pay For',
      format: 'template',
      template: item => {
        if (item.type === 'Customer' && item.invoice) {
          return item.invoice.code;
        } else if (item.type === 'Provider' && item.supplierInvoice) {
          return item.supplierInvoice.code;
        }
      }
    },
    { name: 'eventPlan.name', displayName: 'Event Plan', format: 'link', link: item => '/event-plan/view/' + item.eventPlan._id },
    { name: 'amount', type: 'currency' },
    { name: 'paymentType' },
    { name: 'status' }
  ];
  filterList = [
    { type: 'code', displayName: 'Code', queryType: 'string' },
    { type: 'paymentType', displayName: 'Payment Type', queryType: 'string' }
  ];

  constructor() {}

  ngOnInit() {}
}
