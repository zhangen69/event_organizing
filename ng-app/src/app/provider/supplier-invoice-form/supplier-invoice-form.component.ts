import { Component, OnInit } from '@angular/core';

enum SupplierInvoiceStatus {
  Open,
  Sent,
  Paid,
  Closed,
}

enum SupplierInvoiceType {
  Service,
  Facility,
}

@Component({
  selector: 'app-supplier-invoice-form',
  templateUrl: './supplier-invoice-form.component.html',
  styleUrls: ['./supplier-invoice-form.component.css']
})
export class SupplierInvoiceFormComponent implements OnInit {
  // checkTypeIsService = (formData) => {
  //   return formData.type === SupplierInvoiceType[SupplierInvoiceType.Service];
  // }
  // checkTypeIsFacility = (formData) => {
  //   return formData.type === SupplierInvoiceType[SupplierInvoiceType.Facility];
  // }
  fields = [
    { name: 'code', type: 'string', required: true },
    { name: 'provider', type: 'ref', required: true },
    { name: 'status', type: 'enum', enum: SupplierInvoiceStatus, default: SupplierInvoiceStatus[SupplierInvoiceStatus.Open], required: true },
    { name: 'remarks', type: 'textarea' },
    {
      name: 'lines', type: 'array', displayName: 'Supplier Invoice Items', childName: 'Supplier Invoice Item', fields: [
        { name: 'type', type: 'enum', enum: SupplierInvoiceType, required: true },
        { name: 'name', type: 'string', required: true },
        { name: 'unit', type: 'string', required: true },
        { name: 'unitPrice', type: 'number', required: true },
        { name: 'quantity', type: 'number', required: true },
      ]
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
