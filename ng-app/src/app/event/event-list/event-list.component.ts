import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  columns = [
    { name: 'name', displayName: 'Name', format: 'link', link: '/event/view' },
    { name: 'totalBudgetAmount', displayName: 'Total Budget (RM)', type: 'currency' },
    { name: 'status', displayName: 'Status' },
    { name: 'audit.updatedDate', displayName: 'Updated', type: 'date' },
  ];
  filterList = [
    { type: 'name', display: 'Name', queryType: 'string' },
    { type: 'status', display: 'Status', queryType: 'string' },
  ];
  actions = [
    { name: 'Action 01' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
