import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  includes: string[] = ['provider', 'eventPlan', 'supplierInvoice'];
  columns: IStandardColumn[] = [
     { name: 'provider.name', displayName: 'Provider' },
     { name: 'eventPlan.name', displayName: 'Event Plan', format: 'link', link: (item) => '/event-plan/view/' + item.eventPlan._id },
     { name: 'code' },
     { name: 'amount', type: 'number' },
     { name: 'paymentType' },
     { name: 'status' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
