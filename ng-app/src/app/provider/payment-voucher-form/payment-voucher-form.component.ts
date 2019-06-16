import { Component, OnInit } from '@angular/core';

enum PaymentVoucherStatus {
  Open,
  Sent,
  Paid,
  Closed,
}

@Component({
  selector: 'app-payment-voucher-form',
  templateUrl: './payment-voucher-form.component.html',
  styleUrls: ['./payment-voucher-form.component.css']
})
export class PaymentVoucherFormComponent implements OnInit {
  fields = [
    { name: 'provider', type: 'ref', required: true },
    { name: 'receipt', type: 'ref' },
    { name: 'event', type: 'ref' },
    { name: 'status', type: 'enum', enum: PaymentVoucherStatus, default: PaymentVoucherStatus[PaymentVoucherStatus.Open] },
    {
      name: 'lines', type: 'array', displayName: 'Payment Voucher Items', childName: 'Payment Voucher Item', fields: [
        { name: 'name', type: 'string', required: true },
        { name: 'quantity', type: 'number', required: true },
        { name: 'unitPrice', type: 'number', required: true },
        { name: 'unit', type: 'string', required: true },
        { name: 'providerFacility', type: 'ref' },
        { name: 'providerService', type: 'ref' },
      ]
    },
    { name: 'remarks', type: 'textarea' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
