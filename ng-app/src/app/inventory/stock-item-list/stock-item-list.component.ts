import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-item-list',
  templateUrl: './stock-item-list.component.html',
  styleUrls: ['./stock-item-list.component.css']
})
export class StockItemListComponent implements OnInit {
  columns = [
     { name: 'name' },
     { name: 'category.name', displayName: 'Category' },
     { name: 'cost', displayName: 'Cost (RM)', type: 'currency' },
     { name: 'unit' },
     { name: 'unitPrice', displayName: 'U/Price (RM)', type: 'currency' },
     { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
