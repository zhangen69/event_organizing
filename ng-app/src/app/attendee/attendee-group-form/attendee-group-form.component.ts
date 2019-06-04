import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendee-group-form',
  templateUrl: './attendee-group-form.component.html',
  styleUrls: ['./attendee-group-form.component.css']
})
export class AttendeeGroupFormComponent implements OnInit {
  fields = [
     { name: 'name', type: 'string', displayName: 'Name', required: true },
  ];

  constructor() { }

  ngOnInit() {
  }

}
