import { Component, OnInit } from '@angular/core';
import { StandardFormField } from 'src/app/standard/standard-form-field';
import { RegistrationFormStatus, RegistrationFormFieldType } from '../registration-form-status.enum';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  fields: StandardFormField[] = [
     { name: 'name', type: 'string', required: true },
     { name: 'fields', type: 'array', displayName: 'Form Fields', childName: 'Field', fields: [
       { name: 'name', type: 'string' },
       { name: 'type', type: 'enum', enum: RegistrationFormFieldType, default: RegistrationFormFieldType[RegistrationFormFieldType.string] },
       { name: 'displayName', type: 'string'},
     ] },
     { name: 'status', type: 'enum', enum: RegistrationFormStatus, default: RegistrationFormStatus[RegistrationFormStatus.Open] },
     { name: 'remarks', type: 'textarea' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
