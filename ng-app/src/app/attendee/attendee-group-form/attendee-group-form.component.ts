import { IStandardFormField } from 'src/app/standard/standard-form-field.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendee-group-form',
  templateUrl: './attendee-group-form.component.html',
  styleUrls: ['./attendee-group-form.component.css']
})
export class AttendeeGroupFormComponent implements OnInit {
  fields: IStandardFormField[] = [
    { name: 'name', type: 'string', required: true },
    { name: 'event', type: 'ref', required: true },
    // {
    //   name: 'attachments', type: 'array', childName: 'Attachment', fields: [
    //     { name: 'attachment', type: 'image' },
    //   ]
    // },
    { name: 'description', type: 'textarea' },
    { name: 'remarks', type: 'textarea' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
