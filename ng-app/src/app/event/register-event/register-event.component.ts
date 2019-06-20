import { ActivatedRoute, Params } from '@angular/router';
import { StandardService } from './../../services/standard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.css']
})
export class RegisterEventComponent implements OnInit {
  registrationForm: any;
  formData: any = {};
  attendeeData: any = {};

  constructor(private service: StandardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.init('registration-form');
    this.route.params.subscribe((params: Params) => {
      this.service.fetch(params['formId']).subscribe((res: any) => {
        this.registrationForm = res.data;
      });
    });
  }

  onSubmit() {
    const attendeeData = {
      registrationForm: this.registrationForm._id,
      event: this.registrationForm.event,
      formData: this.formData,
      name: this.attendeeData.name,
    };

    console.log(attendeeData);

  }

}
