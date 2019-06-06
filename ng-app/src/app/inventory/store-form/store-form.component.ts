import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css']
})
export class StoreFormComponent implements OnInit {
  fields = [
     { name: 'name', type: 'string', required: true },
     { name: 'description', type: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
