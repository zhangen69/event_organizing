import { StandardFunctionsService } from './../../standard/standard-functions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { StandardService } from 'src/app/standard/standard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendee-view',
  templateUrl: './attendee-view.component.html',
  styleUrls: ['./attendee-view.component.css']
})
export class AttendeeViewComponent implements OnInit {
  formData: any;

  constructor(private service: StandardService, private route: ActivatedRoute, public functions: StandardFunctionsService) {
    this.service.init('attendee');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.service.fetch(params['id'], null, ['registrationForm']).subscribe((res: any) => {
          this.formData = res.data;
        });
      }
    });
  }

}
