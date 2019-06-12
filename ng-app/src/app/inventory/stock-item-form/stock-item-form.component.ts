import { Component, OnInit } from '@angular/core';
import { StandardFormField } from 'src/app/standard/standard-form-field';

@Component({
  selector: 'app-stock-item-form',
  templateUrl: './stock-item-form.component.html',
  styleUrls: ['./stock-item-form.component.css']
})
export class StockItemFormComponent implements OnInit {
  fields: StandardFormField[] = [
     { name: 'name', type: 'string', displayName: 'Name', required: true },
     { name: 'category', type: 'ref', ref: 'category', refName: 'name', displayName: 'Category', required: true },
     { name: 'cost', displayName: 'Cost (RM)', type: 'number', required: true },
     { name: 'unit', type: 'string', required: true },
     { name: 'unitPrice', displayName: 'U/Price (RM)', type: 'number', required: true },
  ];

  constructor() { }

  ngOnInit() {
  }

}
