import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StandardService } from 'src/app/services/standard.service';

@Component({
  selector: 'app-standard-form-field',
  templateUrl: './standard-form-field.component.html',
  styleUrls: ['./standard-form-field.component.css']
})
export class StandardFormFieldComponent implements OnInit {
  @Input() parentField: any;
  @Input() field: any;
  @Input() formData: any;
  imagePreview: string;
  pickedImage: any = null;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    if (this.field.type === 'object') {
      this.formData[this.field.name] = {};
    } else if (this.field.type === 'array') {
      this.formData[this.field.name] = [{}];
    }

    if (this.parentField && this.parentField.type === 'array' && !this.formData) {
      this.formData = {};
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    if (file.type.indexOf('image/') > -1) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result.toString();
      };
      reader.readAsDataURL(file);
      this.pickedImage = file;
    } else {
      this.toastr.error('Invalid MIME type, please select JPEG or PNG type image.');
    }
  }

}
