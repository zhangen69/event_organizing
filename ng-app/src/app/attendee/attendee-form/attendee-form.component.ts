import { Component, OnInit } from '@angular/core';
import { StandardFormField } from 'src/app/standard/standard-form-field';

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.css']
})
export class AttendeeFormComponent implements OnInit {
  fields: StandardFormField[] = [
     { name: 'name', type: 'string', displayName: 'Name', required: true },
     { name: 'event', type: 'ref', required: true },
     { name: 'registrationForm', type: 'ref', required: true },
     { name: 'attendeeGroup', type: 'ref' },
     { name: 'remarks', type: 'textarea' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
