import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-facility-form',
  templateUrl: './provider-facility-form.component.html',
  styleUrls: ['./provider-facility-form.component.css']
})
export class ProviderFacilityFormComponent implements OnInit {
  includes = ['provider'];
  fields = [
    { name: 'provider', type: 'ref', required: true },
    { name: 'category', type: 'ref', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'unit', type: 'string', required: true },
    { name: 'unitPrice', type: 'number', required: true },
    { name: 'description', type: 'textarea' }
  ];

  constructor() {}

  ngOnInit() {}
}
