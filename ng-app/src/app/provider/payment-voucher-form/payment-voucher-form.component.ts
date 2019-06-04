import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-voucher-form',
  templateUrl: './payment-voucher-form.component.html',
  styleUrls: ['./payment-voucher-form.component.css']
})
export class PaymentVoucherFormComponent implements OnInit {
  fields = [
     { name: 'name', type: 'string', displayName: 'Name', required: true },
  ];

  constructor() { }

  ngOnInit() {
  }

}
