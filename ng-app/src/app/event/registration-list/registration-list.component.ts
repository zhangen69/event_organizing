import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
  actions = [
    { name: 'Publish', format: 'link', link: '/register/', icon: 'public' }
  ]
  columns: IStandardColumn[] = [
     { name: 'name', format: 'link', link: '/registration-form/view' },
     { name: 'remarks' },
     { name: 'status',  },
     { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
