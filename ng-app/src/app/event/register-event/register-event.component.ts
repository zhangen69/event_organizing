import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StandardService } from 'src/app/standard/standard.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { PageLoaderService } from 'src/app/templates/page-loader/page-loader.service';

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
    attendee: any;
    qrcodeLink: string;
    private formService: StandardService;
    private attendeeService: StandardService;

    constructor(
        private route: ActivatedRoute,
        public http: HttpClient,
        public dialog: MatDialog,
        public router: Router,
        public toastr: ToastrService,
        private pageLoaderService: PageLoaderService
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

        this.pageLoaderService.toggle(true);
        this.attendeeService.submit(attendeeData, this.attendeeService.apiUrl + '/register').subscribe((res: any) => {
            this.pageLoaderService.toggle(false);
            this.toastr.success(res.message);
            this.mode = 'submitted';
            this.attendee = res.data;
        });
    }

    dlDataUrlBin() {
        const y = document.querySelector('img');
        this.qrcodeLink = y.src;
    }
}
