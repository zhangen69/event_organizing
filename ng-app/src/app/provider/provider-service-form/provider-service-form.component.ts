import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-service-form',
  templateUrl: './provider-service-form.component.html',
  styleUrls: ['./provider-service-form.component.css']
})
export class ProviderServiceFormComponent implements OnInit {
  includes = ['provider'];
  fields = [
     { name: 'name', type: 'string', required: true },
     { name: 'unit', type: 'string', required: true },
     { name: 'unitPrice', type: 'number', required: true },
     { name: 'provider', type: 'ref', required: true },
     { name: 'description', type: 'textarea' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
