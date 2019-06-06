import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-plan-form',
  templateUrl: './event-plan-form.component.html',
  styleUrls: ['./event-plan-form.component.css']
})
export class EventPlanFormComponent implements OnInit {
  fields = [
    { name: 'name', type: 'string', displayName: 'Name', required: true },
    { name: 'totalBudgetAmount', type: 'number', displayName: 'Total Budget (RM)', required: true },
    { name: 'remarks', type: 'textarea', displayName: 'Remarks' },
  ];

  constructor() {}

  ngOnInit() {}

}
