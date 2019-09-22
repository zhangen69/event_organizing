import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-facility-list',
  templateUrl: './provider-facility-list.component.html',
  styleUrls: ['./provider-facility-list.component.css']
})
export class ProviderFacilityListComponent implements OnInit {
  columns: IStandardColumn[] = [
    { name: 'name' },
    { name: 'unitPrice', displayName: 'U/Price (RM)' },
    { name: 'description' },
    { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
