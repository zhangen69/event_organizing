import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent implements OnInit {
  fields = [
     { name: 'name', type: 'string', displayName: 'Name', required: true },
  ];

  constructor() { }

  ngOnInit() {
  }

}
