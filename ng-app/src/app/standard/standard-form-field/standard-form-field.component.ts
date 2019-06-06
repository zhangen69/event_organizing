import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface IFieldOptions {
  name: string;
  type: string;
  displayName: string;
  required?: boolean;
  default?: any;
  enum?: any;
  enumList?: IFieldEnumList[];
}

interface IFieldEnumList {
  key: string;
  value: string;
}

class FieldModel {
  constructor(private options: IFieldOptions) {
    Object.keys(options).forEach((option: string) => {
      this[option] = options[option];
    });

    if (this.type === 'enum' && this.enum) {
      this.enumList = [];
      Object.keys(this.enum).filter(x => typeof this.enum[x as any] !== 'number').forEach((key: string) => {
        this.enumList.push({ key: key, value: this.enum[key] });
      });
    }
  }

  name: string;
  type: string;
  displayName: string;
  required?: boolean;
  default?: any;
  enum?: any;
  enumList?: IFieldEnumList[];
}

@Component({
  selector: 'app-standard-form-field',
  templateUrl: './standard-form-field.component.html',
  styleUrls: ['./standard-form-field.component.css']
})
export class StandardFormFieldComponent implements OnInit {
  @Input() parentField: any;
  @Input() field: FieldModel;
  @Input() formData: any;
  imagePreview: string;
  pickedImage: any = null;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.initial();
  }

  initial() {
    this.field = new FieldModel(this.field);

    switch (this.field.type) {
      case 'object':
        this.formData[this.field.name] = {};
        break;
      case 'array':
        this.formData[this.field.name] = [{}];
        break;
      default:
        if (this.parentField && this.parentField.type === 'array' && !this.formData) {
          this.formData = {};
        }
        break;
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
