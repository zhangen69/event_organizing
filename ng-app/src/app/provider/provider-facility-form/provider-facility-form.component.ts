import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-facility-form',
  templateUrl: './provider-facility-form.component.html',
  styleUrls: ['./provider-facility-form.component.css']
})
export class ProviderFacilityFormComponent implements OnInit {
  fields = [
     { name: 'name', type: 'string', displayName: 'Name', required: true },
  ];

  constructor() { }

  ngOnInit() {
  }

}
