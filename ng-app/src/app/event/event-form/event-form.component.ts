import { EventStatus } from './../event-status.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  enumList = [];
  includes = ['customer'];
  fields = [
    { name: 'name', type: 'string', displayName: 'Name', required: true },
    { name: 'customer', type: 'ref', required: true },
    { name: 'status', type: 'enum', displayName: 'Status', enum: EventStatus, default: EventStatus[EventStatus.Open], required: true },
    { name: 'dateFrom', type: 'date', required: true },
    { name: 'dateTo', type: 'date', required: true },
    { name: 'timeFrom', type: 'time', required: true },
    { name: 'timeTo', type: 'time', required: true },
    // { name: 'totalBudgetAmount', type: 'number', displayName: 'Total Budget (RM)', required: true },
    { name: 'venue', type: 'textarea-autocomplete', ref: 'event/venue/list', refName: '' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
