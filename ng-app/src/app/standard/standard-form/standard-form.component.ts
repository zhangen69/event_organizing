import { IStandardFormField } from './../standard.interface';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StandardService } from 'src/app/standard/standard.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { PageLoaderService } from 'src/app/templates/page-loader/page-loader.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { StandardFormService } from '../standard-form.service';
import { TitleDisplayPipe } from 'src/app/pipes/title-display.pipe';

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})
export class StandardFormComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() domainName: string;
  @Input() fields: IStandardFormField[];
  @Input() includes: string[];
  @Input() dataSource: any;
  @Input() callback: boolean;
  @Output() cancel = new EventEmitter<any>();
  @Output() submitFunc = new EventEmitter<any>();
  @Output() afterSubmit = new EventEmitter<any>();
  form: FormGroup;
  get getFormErrors() {
    const errors = this.fields.filter((field) => {
      return this.form.controls[field.name].errors !== null;
    }).map((field) => {
      const errors = this.form.controls[field.name].errors;
      return { field: field.name, errors };
    });
    return errors;
  }

  mode = 'create';
  formData: any = {};
  imagePreview = {};
  pickedImage: any = null;
  formId: string;
  private standardService: StandardService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService,
    private location: Location,
    private pageLoaderService: PageLoaderService,
    private http: HttpClient,
    private dialog: MatDialog,
    private titleService: Title,
    private standardFormService: StandardFormService,
    private titleDisplayPipe: TitleDisplayPipe
  ) {
    this.standardService = new StandardService(this.http, this.dialog, this.router, this.toastr);
  }

  ngOnInit() {
    if (this.fields && this.fields.length > 0) {
      this.form = this.standardFormService.toFormGroup(this.fields);
    }
    if (this.title) {
      this.titleService.setTitle(
        (this.title ? this.title : (this.formData._id ? 'Edit' : 'New') + ' ' + this.titleDisplayPipe.transform(this.domainName)) +
        ' - ' +
        environment.title
      );
    }

    this.formId = 'form_' + moment().format('x');
    this.standardService.init(this.domainName);
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        if (this.title) {
          this.titleService.setTitle('Edit ' + this.title + ' - ' + environment.title);
        }

        this.pageLoaderService.toggle(true);
        this.mode = 'update';
        this.standardService.fetch(params['id'], null, this.includes).subscribe({
          next: (res: any) => {
            this.formData = res.data;
            this.transformTimeValue(this.formData);
            this.initialDefaultValues(this.formData);
            this.form.patchValue(this.formData);
            this.pageLoaderService.toggle(false);
          },
          error: (res: any) => {
            this.pageLoaderService.toggle(false);
            this.toastr.error(res.error.message);
          }
        });
      }
    });
    this.fields.forEach(field => {
      if (field.default) {
        this.formData[field.name] = field.default;
      }
    });
    if (this.dataSource) {
      this.mode = 'update';
      this.formData = this.dataSource;
    }
  }

  ngAfterViewInit() {
    this.form.patchValue(this.formData);
  }

  private initialDefaultValues(formData: any) {
    this.fields.forEach(field => {
      let defaultValue;

      switch (field.type) {
        case 'object':
          defaultValue = {};
          break;
        case 'array':
        case 'table':
          defaultValue = [{}];
          break;
        case 'date':
        case 'time':
          defaultValue = new Date();
          break;
        case 'boolean':
          defaultValue = false;
          break;
      }

      if (!this.checkHasValue(formData, field.name)) {
        formData[field.name] = defaultValue;
      }
    });
  }

  private checkHasValue(formData, fieldName) {
    return formData[fieldName];
  }

  onUploadFile() {
    this.standardService.uploadImage(this.pickedImage).then((res: any) => {
      this.formData.photoUrl = res.url;
      this.pickedImage = null;
      this.onSubmit();
    });
  }

  onCancel(url) {
    if (this.cancel.observers.length > 0) {
      this.cancel.emit({ dismiss: true });
    } else if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate([`/${this.domainName}/list`]);
    }
  }

  onCheckFormValidation(form: FormGroup) {
    return Object.keys(form.controls).filter((controlKey) => {
      const error = form.controls[controlKey].errors;
      return error;
    }).map((controlKey) => {
      const control = form.controls[controlKey];
      const field = this.fields.find((field) => field.name === controlKey);
      return { key: controlKey, message: this.getErrorMessage(control.errors), displayName: field.displayName };
    });
  }

  getErrorMessage(error: ValidationErrors) {
    if (error.required) {
      return 'This field is required, cannot be empty';
    }
  }

  onSubmit() {
    const errors = this.onCheckFormValidation(this.form);
    // double check form validation
    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        this.toastr.error(error.message, error.displayName);
      });
      return;
    }

    const formData = this.form.value;

    // transform value for time
    this.transformTimeValue(formData, true);

    if (this.pickedImage !== null) {
      this.onUploadFile();
    } else if (this.callback && this.submitFunc.observers.length > 0) {
      this.submitFunc.emit(formData);
    } else {
      this.fields
        .filter(field => {
          return field.type === 'ref';
        })
        .forEach(field => {
          if (typeof formData[field.type] !== 'object') {
            formData[field.type] = null;
          }
        });

      this.pageLoaderService.toggle(true);
      this.standardService.submit(formData).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this.pageLoaderService.toggle(false);
          if (this.afterSubmit.observers.length > 0) {
            formData._id = res.data._id;
            this.afterSubmit.emit(formData);
          } else {
            this.onCancel(`/${this.domainName}/list`);
          }
        },
        (res: any) => {
          this.pageLoaderService.toggle(false);
          this.toastr.error(res.error.message);
        }
      );
    }
  }

  private transformTimeValue(formData, toDate = false) {
    if (this.fields.some((field) => field.type === 'time')) {
      this.fields.filter((field) => field.type === 'time').forEach((field) => {
        const date = toDate ? new Date() : new Date(formData[field.name]);
        if (!toDate) {
          const hours = date.getHours();
          const minutes = date.getMinutes();
          formData[field.name] = (hours > 9 ? hours : '0' + hours) + ':' + (minutes > 9 ? minutes : '0' + minutes);
        } else {
          const timeItems: string[] = formData[field.name].split(':');
          date.setHours(Number(timeItems[0]));
          date.setMinutes(Number(timeItems[1]));
          formData[field.name] = date;
        }
      });
    }
  }
}
