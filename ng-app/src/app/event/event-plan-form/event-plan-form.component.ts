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
  mode = 'create';
  formData: any = { name: null, totalBudgetAmount: null };
  fields = [
    { name: 'name', type: 'string', displayName: 'Name', required: true },
    { name: 'totalBudgetAmount', type: 'number', displayName: 'Total Budget (RM)', required: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private service: StandardService,
    private toastr: ToastrService
  ) {
    this.service.init('event-plan');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.mode = 'update';
        this.service.fetch(params['id']).subscribe((res: any) => {
          this.formData = res.data;
        });
      }
    });
  }

  onSubmit() {
    if (this.mode === 'update') {
      this.service.update(this.formData);
    } else if (this.mode === 'create') {
      this.service.create(this.formData);
    }
  }
}
