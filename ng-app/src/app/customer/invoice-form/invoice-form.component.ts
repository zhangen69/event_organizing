import { Component, OnInit } from '@angular/core';

enum InvoiceStatus {
  Open,
  Sent,
  Paid,
  Closed,
}

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  includes = ['customer', 'eventPlan'];
  fields = [
    { name: 'code', type: 'string', required: true },
    { name: 'customer', type: 'ref', required: true },
    { name: 'eventPlan', type: 'ref' },
    { name: 'status', type: 'enum', enum: InvoiceStatus, default: InvoiceStatus[InvoiceStatus.Open], required: true },
    { name: 'remarks', type: 'textarea' },
    {
      name: 'lines', type: 'table', displayName: 'Invoice Items', fields: [
        { name: 'name', type: 'string', required: true },
        { name: 'unit', type: 'string', required: true },
        { name: 'unitPrice', type: 'number', required: true },
        { name: 'quantity', type: 'number', required: true },
      ]
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
