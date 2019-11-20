import { Component, OnInit } from '@angular/core';
import { IStandardColumn } from 'src/app/standard/standard.interface';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css']
})
export class QuotationListComponent implements OnInit {
  includes: string[] = ['customer', 'eventPlan'];
  columns: IStandardColumn[] = [
     { name: 'customer.name', displayName: 'Customer', width: '250px' },
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
