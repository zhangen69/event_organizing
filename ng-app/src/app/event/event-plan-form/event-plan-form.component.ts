import { Component, OnInit } from '@angular/core';
import { IStandardFormField } from 'src/app/standard/standard-form-field.interface';

@Component({
  selector: 'app-event-plan-form',
  templateUrl: './event-plan-form.component.html',
  styleUrls: ['./event-plan-form.component.css']
})
export class EventPlanFormComponent implements OnInit {
  includes = [
    'services.providerService',
    'facilities.providerFacility',
    'stockItems.stockItem',
  ];
  fields: IStandardFormField[] = [
    { name: 'name', type: 'string', displayName: 'Name', required: true },
    {
      name: 'services', type: 'table', fields: [
        { name: 'providerService', type: 'ref' },
        { name: 'quantity', type: 'number' },
        { name: 'remarks', type: 'textarea' },
      ]
    },
    {
      name: 'facilities', type: 'table', fields: [
        { name: 'providerFacility', type: 'ref' },
        { name: 'quantity', type: 'number' },
        { name: 'remarks', type: 'textarea' },
      ]
    },
    {
      name: 'stockItems', type: 'table', fields: [
        { name: 'stockItem', type: 'ref' },
        { name: 'quantity', type: 'number' },
        { name: 'remarks', type: 'textarea' },
      ]
    },
    { name: 'totalBudgetAmount', type: 'number', displayName: 'Total Budget (RM)', required: true },
    { name: 'remarks', type: 'textarea', displayName: 'Remarks' },
  ];

  constructor() { }

  ngOnInit() { }

}
