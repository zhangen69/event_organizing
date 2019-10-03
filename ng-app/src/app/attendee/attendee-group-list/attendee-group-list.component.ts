import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendee-group-list',
  templateUrl: './attendee-group-list.component.html',
  styleUrls: ['./attendee-group-list.component.css']
})
export class AttendeeGroupListComponent implements OnInit {
  includes: string[] = ['event'];
  columns: IStandardColumn[] = [
     { name: 'name' },
     { name: 'description' },
     { name: 'event.name', displayName: 'Event' },
     { name: 'remarks' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
