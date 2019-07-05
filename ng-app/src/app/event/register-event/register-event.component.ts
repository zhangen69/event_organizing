import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StandardService } from 'src/app/standard/standard.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-register-event',
    templateUrl: './register-event.component.html',
    styleUrls: ['./register-event.component.css']
})
export class RegisterEventComponent implements OnInit {
    mode = 'new';
    registrationForm: any;
    formData: any = {};
    attendeeData: any = {};
    private formService: StandardService;
    private attendeeService: StandardService;

    constructor(
        private route: ActivatedRoute,
        public http: HttpClient,
        public dialog: MatDialog,
        public router: Router,
        public toastr: ToastrService
    ) {
        this.formService = new StandardService(this.http, this.dialog, this.router, this.toastr);
        this.attendeeService = new StandardService(this.http, this.dialog, this.router, this.toastr);
    }

    ngOnInit() {
        this.attendeeService.init('attendee');
        this.formService.init('registration-form');
        this.route.params.subscribe((params: Params) => {
            this.formService.fetch(params['formId']).subscribe((res: any) => {
                this.registrationForm = res.data;
            });
        });
    }

    onSubmit() {
        const attendeeData = {
            registrationForm: this.registrationForm._id,
            event: this.registrationForm.event,
            formData: this.formData
        };

        Object.keys(this.attendeeData).forEach(key => {
            attendeeData[key] = this.attendeeData[key];
        });

        const url = this.attendeeService.apiUrl + '/register';

        this.attendeeService.submit(attendeeData, url).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.mode = 'submitted';
        });
    }
}
