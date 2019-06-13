import { Component, OnInit } from '@angular/core';
import { IStandardFormField } from 'src/app/standard/standard-form-field.interface';
import { RegistrationFormStatus, RegistrationFormFieldType } from '../registration-form-status.enum';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  fields: IStandardFormField[] = [
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
