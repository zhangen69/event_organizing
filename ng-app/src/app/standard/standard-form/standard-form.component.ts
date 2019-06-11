import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  mode = 'create';
  formData: any = {};
  imagePreview = {};
  pickedImage: any = null;

  constructor(
    private route: ActivatedRoute,
    private service: StandardService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.init(this.domainName);
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.mode = 'update';
        this.service.fetch(params['id']).subscribe((res: any) => {
          this.formData = res.data;
        });
      }
    });
    this.fields.forEach(field => {
      if (field.default) {
        this.formData[field.name] = field.default;
      }
    });
  }

  onUploadFile() {
    this.service.uploadImage(this.pickedImage).then((res: any) => {
      this.formData.photoUrl = res.url;
      this.pickedImage = null;
      this.onSubmit();
    });
  }

  onSubmit() {
    if (this.pickedImage !== null) {
      this.onUploadFile();
    } else {
      if (this.mode === 'update') {
        this.service.update(this.formData);
      } else if (this.mode === 'create') {
        this.service.create(this.formData);
      }
    }
  }
}
