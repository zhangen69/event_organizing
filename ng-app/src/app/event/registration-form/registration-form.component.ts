import { Component, OnInit } from '@angular/core';
import { IStandardFormField } from 'src/app/standard/standard-form-field.interface';
import { RegistrationFormStatus, RegistrationFormFieldType } from '../registration-form-status.enum';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  includes = ['event'];
  fields: IStandardFormField[] = [
     { name: 'name', type: 'string', required: true },
     { name: 'event', type: 'ref', required: true },
     { name: 'status', type: 'enum', enum: RegistrationFormStatus, default: RegistrationFormStatus[RegistrationFormStatus.Open] },
     { name: 'remarks', type: 'textarea' },
     { name: 'fields', type: 'table', displayName: 'Form Fields', childName: 'Field', fields: [
       { name: 'name', type: 'string' },
       { name: 'type', type: 'enum', enum: RegistrationFormFieldType, default: RegistrationFormFieldType[RegistrationFormFieldType.string] },
       { name: 'displayName', type: 'string'},
     ] },
  ];

  constructor() { }

  ngOnInit() {
  }

}
