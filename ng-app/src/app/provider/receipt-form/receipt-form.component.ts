import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.css']
})
export class ReceiptFormComponent implements OnInit {
  fields = [
     { name: 'provider', type: 'ref', required: true },
     { name: 'supplierInvoice', type: 'ref' },
     { name: 'lines', type: 'array', displayName: 'Receipt Items', childName: 'Receipt Item', fields: [
       { name: 'name', type: 'string', reuqired: true },
       { name: 'unit', type: 'string', reuqired: true },
       { name: 'quantity', type: 'number', reuqired: true },
       { name: 'unitPrice', displayName: 'U/Price (RM)', type: 'number', reuqired: true },
     ] },
     { name: 'remarks', type: 'textarea' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
