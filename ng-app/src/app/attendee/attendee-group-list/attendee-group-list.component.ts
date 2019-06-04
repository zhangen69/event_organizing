import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendee-group-list',
  templateUrl: './attendee-group-list.component.html',
  styleUrls: ['./attendee-group-list.component.css']
})
export class AttendeeGroupListComponent implements OnInit {
  columns = [
     { name: 'name', displayName: 'Name' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
