import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  includes: string[] = ['customer','event'];
  columns: IStandardColumn[] = [
     { name: 'customer.name', displayName: 'Customer' },
     { name: 'event.name', displayName: 'Event' },
     { name: 'status' },
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
