import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-transaction-list',
  templateUrl: './stock-transaction-list.component.html',
  styleUrls: ['./stock-transaction-list.component.css']
})
export class StockTransactionListComponent implements OnInit {
  includes = ['store', 'event', 'receipt'];
  columns: IStandardColumn[] = [
     { name: 'stockItemName', displayName: 'Stock Item' },
     { name: 'stockItemUnit', displayName: 'Unit' },
     { name: 'stockItemUnitPrice', displayName: 'Price' },
     { name: 'stockItemCategory.name', displayName: 'Category' },
     { name: 'type' },
     { name: 'store.name', displayName: 'Store' },
     { name: 'event.name', displayName: 'Event' },
     { name: 'receipt.name', displayName: 'Receipt' },
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
