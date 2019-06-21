import { StandardFunctionsService } from './../../standard/standard-functions.service';
import { StandardService } from 'src/app/standard/standard.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.css']
})
export class RegistrationViewComponent implements OnInit {
  formData: any;

  constructor(private service: StandardService, private route: ActivatedRoute, public functions: StandardFunctionsService) { }

  ngOnInit() {
    this.service.init('registration-form');
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.service.fetch(params['id']).subscribe((res: any) => {
          this.formData = res.data;
        });
      }
    });
  }

}
