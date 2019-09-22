import { IStandardColumn } from 'src/app/standard/standard.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  columns: IStandardColumn[] = [
     { name: 'name', displayName: 'Name' },
  ];
  filterList = [
     { type: 'name', display: 'Name', queryType: 'string' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
