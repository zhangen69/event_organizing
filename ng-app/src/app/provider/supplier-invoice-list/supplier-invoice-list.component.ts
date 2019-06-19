import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-invoice-list',
  templateUrl: './supplier-invoice-list.component.html',
  styleUrls: ['./supplier-invoice-list.component.css']
})
export class SupplierInvoiceListComponent implements OnInit {
  columns = [
    { name: 'code' },
    { name: 'provider.name', displayName: 'Provider' },
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
