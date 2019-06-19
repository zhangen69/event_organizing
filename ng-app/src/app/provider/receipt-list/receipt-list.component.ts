import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit {
  columns = [
    { name: 'code' },
    { name: 'provider.name', displayName: 'Provider' },
    { name: 'supplierInvoice.name', displayName: 'Supplier Invoice' },
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
