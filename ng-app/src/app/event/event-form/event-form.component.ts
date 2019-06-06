import { EventStatus } from './../event-status.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  enumList = [];
  fields = [
    { name: 'name', type: 'string', displayName: 'Name', required: true },
    { name: 'totalBudgetAmount', type: 'number', displayName: 'Total Budget (RM)', required: true },
    { name: 'status', type: 'enum', displayName: 'Status', enum: EventStatus, default: EventStatus[EventStatus.Open], required: true },
  ];

  constructor() { }

  ngOnInit() {
  }

}
