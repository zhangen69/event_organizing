import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IStandardFormField } from 'src/app/standard/standard.interface';

@Injectable({
  providedIn: 'root'
})
export class StandardFormService {

  constructor() { }

  toFormGroup(formFields: IStandardFormField[]): FormGroup {
    const group = {};

    formFields.forEach(field => {
      group[field.name] = field.required ? new FormControl('', Validators.required) : new FormControl('');
    });

    return new FormGroup(group);
  }
}
