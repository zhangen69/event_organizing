import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-voucher-list',
  templateUrl: './payment-voucher-list.component.html',
  styleUrls: ['./payment-voucher-list.component.css']
})
export class PaymentVoucherListComponent implements OnInit {
  includes = ['provider', 'receipt', 'eventPlan'];
  columns: IStandardColumn[] = [
    { name: 'provider.name', displayName: 'Provider' },
    { name: 'eventPlan.name', displayName: 'Event Plan' },
    { name: 'code' },
    { name: 'status' },
    { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' }
  ];
  filterList = [{ type: 'name', display: 'Name', queryType: 'string' }];

  constructor() {}

  ngOnInit() {}
}
