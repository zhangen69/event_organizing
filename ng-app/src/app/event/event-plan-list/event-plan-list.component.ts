import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-plan-list',
  templateUrl: './event-plan-list.component.html',
  styleUrls: ['./event-plan-list.component.css']
})
export class EventPlanListComponent implements OnInit {
  // actions:
  columns: IStandardColumn[] = [
    { name: 'name', displayName: 'Name' },
    { name: 'totalBudgetAmount', displayName: 'Total Budget (RM)', type: 'currency' },
    { name: 'remarks', displayName: 'Remarks' },
    { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
    { type: 'name', display: 'Name', queryType: 'string' },
    { type: 'remarks', display: 'Remarks', queryType: 'string' },
  ];

  constructor() {}

  ngOnInit() {}

}
