import { HttpClient } from '@angular/common/http';
import { TitleDisplayPipe } from './../../pipes/title-display.pipe';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

interface IFieldOptions {
  name: string;
  type: string;
  displayName?: string;
  required?: boolean;
  default?: any;
  enum?: any;
  enumList?: IFieldEnumList[];
  fields?: any[];
  childName?: string;
  ref?: string;
  refName?: string;
  refValue: string;
  refOptions?: any[];
}

interface IFieldEnumList {
  key: string;
  value: string;
}

class FieldModel implements IFieldOptions {
  constructor(private options: IFieldOptions, private titleDisplayPipe: TitleDisplayPipe, private http: HttpClient) {
    Object.keys(options).forEach((option: string) => {
      this[option] = options[option];
    });

    if (this.type === 'enum' && this.enum) {
      this.enumList = [];
      Object.keys(this.enum).filter(x => typeof this.enum[x as any] !== 'number').forEach((key: string) => {
        this.enumList.push({ key: key, value: this.enum[key] });
      });
    } else if (this.type === 'ref') {
      if (!this.ref) {
        this.ref = this.name.replace(/([A-Z])/g, '-$1').toLowerCase();
      }

      if (!this.refName) {
        this.refName = 'name';
      }

      this.http.get(`${environment.apiUrl}/service/${this.ref}`).subscribe((res: any) => this.refOptions = res.data);
    }

    if (!this.displayName) {
      this.displayName = this.titleDisplayPipe.transform(this.name);
    }
  }

  name: string;
  type: string;
  displayName?: string;
  required?: boolean;
  default?: any;
  enum?: any;
  enumList?: IFieldEnumList[];
  fields?: any[];
  childName?: string;
  ref?: string;
  refName?: string;
  refValue: string;
  refOptions?: any[];
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

  constructor(private toastr: ToastrService, private titleDisplayPipe: TitleDisplayPipe, private http: HttpClient) { }

  ngOnInit() {
    this.initial();
  }

  initial() {
    this.field = new FieldModel(this.field, this.titleDisplayPipe, this.http);

    switch (this.field.type) {
      case 'object':
        if (!this.formData[this.field.name]) {
          this.formData[this.field.name] = {};
        }
        break;
      case 'array':
        if (!this.formData[this.field.name]) {
          this.formData[this.field.name] = [{}];
        }
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

  getOptions(): any[] {
    return [
      { name: 'One', value: 1 },
      { name: 'Two', value: 2 },
      { name: 'Three', value: 3 },
    ];
  }

  displayFn = item => {
    return item ? item[this.field.refName] : undefined;
  }

  onAddItemInArray(array) {
    array.push({});
  }

}
