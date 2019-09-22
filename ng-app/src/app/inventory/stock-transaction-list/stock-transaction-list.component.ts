import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-transaction-list',
  templateUrl: './stock-transaction-list.component.html',
  styleUrls: ['./stock-transaction-list.component.css']
})
export class StockTransactionListComponent implements OnInit {
  columns: IStandardColumn[] = [
     { name: 'name', displayName: 'Name' },
     { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
