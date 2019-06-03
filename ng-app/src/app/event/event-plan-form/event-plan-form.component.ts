import { ToastrService } from 'ngx-toastr';
import { StandardService } from 'src/app/services/standard.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-event-plan-form',
  templateUrl: './event-plan-form.component.html',
  styleUrls: ['./event-plan-form.component.css']
})
export class EventPlanFormComponent implements OnInit {
  fields = [
    { name: 'name', type: 'string', displayName: 'Name', required: true },
    { name: 'totalBudgetAmount', type: 'number', displayName: 'Total Budget (RM)', required: true },
  ];

  constructor() {}

  ngOnInit() {}

}
