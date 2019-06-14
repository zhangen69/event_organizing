import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.css']
})
export class AttendeeListComponent implements OnInit {
  columns = [
     { name: 'name' },
     { name: 'attendeeGroup.name', displayName: 'Group' },
     { name: 'remarks' },
  ];
  filterList = [
     { type: 'name', queryType: 'string' },
     { type: 'remarks', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
