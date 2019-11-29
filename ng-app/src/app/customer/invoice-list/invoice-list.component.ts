import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  includes: string[] = ['customer', 'eventPlan'];
  columns: IStandardColumn[] = [
     { name: 'customer.name', displayName: 'Customer', width: '250px', format: 'link', link: (item) => '/customer/view/' + item.customer._id },
     { name: 'eventPlan.name', displayName: 'Event Plan', width: '200px' },
     { name: 'status', width: '100px' },
     { name: 'remarks' },
     { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
