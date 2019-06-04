import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.css']
})
export class ReceiptFormComponent implements OnInit {
  fields = [
     { name: 'name', type: 'string', displayName: 'Name', required: true },
  ];

  constructor() { }

  ngOnInit() {
  }

}
