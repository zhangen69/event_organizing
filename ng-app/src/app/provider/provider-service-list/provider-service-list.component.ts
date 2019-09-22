import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-service-list',
  templateUrl: './provider-service-list.component.html',
  styleUrls: ['./provider-service-list.component.css']
})
export class ProviderServiceListComponent implements OnInit {
  columns: IStandardColumn[] = [
     { name: 'name' },
     { name: 'unitPrice', displayName: 'U/Price (RM)', type: 'currency' },
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
