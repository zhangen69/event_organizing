import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  fields = [
     { name: 'name', type: 'string', displayName: 'Name', required: true },
     { name: 'email', type: 'string', displayName: 'Email', required: true },
     { name: 'address', type: 'string', displayName: 'Address', required: true },
     { name: 'registrationNumber', type: 'string', displayName: 'Registration Number', required: true },
     { name: 'personInCharged', type: 'object', displayName: 'Person In Charged', fields: [
       { name: 'name', type: 'string', displayName: 'Name' },
       { name: 'email', type: 'string', displayName: 'Email' },
       { name: 'phoneNumber', type: 'string', displayName: 'Contact No.' },
     ]},
  ];

  constructor() { }

  ngOnInit() {
  }

}
