import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StandardService } from 'src/app/standard/standard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})
export class StandardFormComponent implements OnInit {
  @Input() title: string;
  @Input() domainName: string;
  @Input() fields: any[];
  @Input() includes: string[];
  @Input() dataSource: any;
  @Output() cancel = new EventEmitter<any>();

  mode = 'create';
  formData: any = {};
  imagePreview = {};
  pickedImage: any = null;

  constructor(
    private route: ActivatedRoute,
    private service: StandardService,
    private router: Router,
    public toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.service.init(this.domainName);
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.mode = 'update';
        this.service.fetch(params['id'], null, this.includes).subscribe((res: any) => {
          this.formData = res.data;
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

  onUploadFile() {
    this.service.uploadImage(this.pickedImage).then((res: any) => {
      this.formData.photoUrl = res.url;
      this.pickedImage = null;
      this.onSubmit();
    });
  }

  onCancel(url) {
    if (this.cancel.observers.length > 0) {
      this.cancel.emit();
    } else {
      this.router.navigate([url]);
    }
  }

  onSubmit() {
    if (this.pickedImage !== null) {
      this.onUploadFile();
    } else {
      this.fields.filter((field) => {
        return field.type === 'ref';
      }).forEach((field) => {
        if (typeof this.formData[field.type] !== 'object') {
          this.formData[field.type] = null;
        }
      });

      this.service.submit(this.formData).subscribe((res: any) => {
        this.toastr.success(res.message);
        if (this.cancel.observers.length > 0) {
          this.cancel.emit();
        } else {
          this.router.navigate([`/${this.domainName}/list`]);
        }
      });
    }
  }
}
