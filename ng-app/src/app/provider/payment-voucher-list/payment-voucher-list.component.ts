import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-voucher-list',
  templateUrl: './payment-voucher-list.component.html',
  styleUrls: ['./payment-voucher-list.component.css']
})
export class PaymentVoucherListComponent implements OnInit {
  includes = ['provider', 'receipt', 'event'];
  columns: IStandardColumn[] = [
     { name: 'code' },
     { name: 'provider.name', displayName: 'Provider' },
     { name: 'event.name', displayName: 'Event' },
     { name: 'status' },
     { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
