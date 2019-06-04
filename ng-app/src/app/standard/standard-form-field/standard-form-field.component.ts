import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-standard-form-field',
  templateUrl: './standard-form-field.component.html',
  styleUrls: ['./standard-form-field.component.css']
})
export class StandardFormFieldComponent implements OnInit {
  @Input() field: string;
  @Input() formData: any;

  constructor() { }

  ngOnInit() {
  }

}
