import { Component, OnInit } from '@angular/core';

enum SupplierInvoiceStatus {
  Open,
  Sent,
  Paid,
  Closed,
}

@Component({
  selector: 'app-supplier-invoice-form',
  templateUrl: './supplier-invoice-form.component.html',
  styleUrls: ['./supplier-invoice-form.component.css']
})
export class SupplierInvoiceFormComponent implements OnInit {
  fields = [
     { name: 'provider', type: 'ref', required: true },
     { name: 'supplierInvoice', type: 'ref', required: true },
     { name: 'status', type: 'enum', enum: SupplierInvoiceStatus, default: SupplierInvoiceStatus[SupplierInvoiceStatus.Open], required: true },
     { name: 'lines', type: 'array', displayName: 'Supplier Invoice Items', childName: 'Supplier Invoice Item', fields: [
       { name: 'name', type: 'string', required: true },
       { name: 'quantity', type: 'number', required: true },
       { name: 'unit', type: 'string', required: true },
       { name: 'unitPrice', type: 'number', required: true },
     ] },
     { name: 'remarks', type: 'textarea' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
