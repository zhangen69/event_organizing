import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TitleDisplayPipe } from './../../pipes/title-display.pipe';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { map, throttleTime } from 'rxjs/operators';
import { IStandardFormField } from '../standard.interface';

@Component({
  selector: 'app-standard-form-field',
  templateUrl: './standard-form-field.component.html',
  styleUrls: ['./standard-form-field.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardFormFieldComponent implements OnInit {
  @Input() parentField: any;
  @Input() field: IStandardFormField;
  @Input() formData: any;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.field.name].valid;
  }
  get isTouched() {
    return this.form.controls[this.field.name].touched;
  }
  get getErrors() {
    return this.form.controls[this.field.name].errors;
  }
  imagePreview: string;
  pickedImage: any = null;
  selectedTime: string;

  constructor(
    private toastr: ToastrService,
    private titleDisplayPipe: TitleDisplayPipe,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.initial();
  }

  initial() {
    if (!this.formData) {
      this.formData = {};
    }

    this.transformFormField(this.field, this.formData);
  }

  private transformFormField(field: IStandardFormField, formData: any) {
    // check field
    if (!field) {
      console.error('Form Field cannot be empty');
      return;
    }

    switch (field.type) {
      case 'object':
        if (!formData[field.name]) {
          formData[field.name] = {};
        }
        break;
      // check type: enum
      case 'enum':
        if (!field.enum) {
          console.error('Form Field Enum cannot be empty');
          return;
        }
        field.enumList = [];
        Object.keys(field.enum)
          .filter(x => typeof field.enum[x as any] !== 'number')
          .forEach((key: string) => {
            field.enumList.push({ key: key, value: field.enum[key] });
          });
        break;
      // check type: ref + textarea-autocomplete
      case 'ref':
      case 'textarea-autocomplete':
        // check ref
        if (!field.ref) {
          field.ref = field.name.replace(/([A-Z])/g, '-$1').toLowerCase();
        }
        // check refName
        if (!field.refName && field.refName !== '') {
          field.refName = 'name';
        }
        // setup/config api url
        let api = `${environment.apiUrl}/service/${field.ref}`;
        // check refIncludes
        if (field.refIncludes && field.refIncludes.length > 0) {
          let queryModel: any = {};
          // check queryModel
          if (field.queryModel) {
            queryModel = field.queryModel;
          }
          queryModel.includes = field.refIncludes;
          api += `?queryModel=${JSON.stringify(queryModel)}`;
        } else if (field.queryModel) {
          api += `?queryModel=${JSON.stringify(field.queryModel)}`;
        }
        // setup/config subscription
        const request$ = this.http
          .get(api)
          .pipe(
            throttleTime(500),
            map((res: any) => res.data)
          )
          .subscribe(options => {
            field.refOptions = options;
          });
        break;
      // check type: table
      case 'array':
      case 'table':
        if (!field.fields && !field.fields.length) {
          console.error('Fields/Columns cannot be empty');
          return;
        }
        field.fields.forEach(field => {
          if (!field.displayName) {
            field.displayName = this.titleDisplayPipe.transform(field.name);
          }
        });
        if (!formData[field.name] && !field.default) {
          formData[field.name] = [{}];
        }
        if (field.default && !formData[field.name]) {
          formData[field.name] = field.default;
        }
        break;
      case 'date':
        if (!formData[field.name]) {
          formData[field.name] = new Date();
        }
        break;
      case 'time':
        let date = new Date();

        if (formData[field.name]) {
          date = new Date(formData[field.name]);
        } else {
          formData[field.name] = date;
        }
        const hours =
          date.getHours() > 9
            ? date.getHours()
            : '0' + date.getHours().toString();
        const minutes =
          date.getMinutes() > 9
            ? date.getMinutes()
            : '0' + date.getMinutes().toString();
        formData[field.name] = `${hours}:${minutes}`;
        break;
      case 'boolean':
        if (!formData[field.name]) {
          formData[field.name] = false;
        }
        break;
      default:
        if (
          this.parentField &&
          this.parentField.type === 'array' &&
          !formData
        ) {
          formData = {};
        }

        if (field.default && !formData[field.name]) {
          formData[field.name] = field.default;
        }

        break;
    }

    // check displayName
    if (!field.displayName) {
      field.displayName = this.titleDisplayPipe.transform(field.name);
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
      this.toastr.error(
        'Invalid MIME type, please select JPEG or PNG type image.'
      );
    }
  }

  getOptions(): any[] {
    return [
      { name: 'One', value: 1 },
      { name: 'Two', value: 2 },
      { name: 'Three', value: 3 }
    ];
  }

  getRefValue(option, field) {
    // if (option && field.refChange) {
    //   this.field.refChange(option, this.formData);
    // }

    if (!field.refValue) {
      return option;
    }

    return option[field.refValue];
  }

  displayFn = item => {
    if (!item) {
      return undefined;
    }

    if (!this.field.refValue && this.field.refName) {
      return item[this.field.refName];
    }

    return item;
  }

  onAddItemInArray(array) {
    if (!array) {
      array = [];
    }

    if (this.field.add) {
      this.field.add(array);
    } else {
      array.push({});
    }
  }

  onRemoveItemFromArray(array, index) {
    array.splice(index, 1);
  }

  isShow(field): boolean {
    if (!field.isShow) {
      return true;
    }

    return field.isShow(this.formData);
  }

  displayValue(value, prop) {
    if (!prop) {
      return value;
    }

    return value[prop];
  }

  getRefOptions(options, filterOption) {
    if (filterOption && options) {
      const key = this.formData[filterOption.type][filterOption.fieldName];
      options = options.filter(option => option[filterOption.type] === key);
    }

    return options;
  }

  getInputMaxValue(max, formData) {
    if (!max) {
      return false;
    }

    if (typeof max === 'function') {
      return max(formData);
    }

    return max;
  }

  checkInputValid(max, element) {
    if (max && element.value && element.value > max) {
      element.value = max;
      this.formData[this.field.name] = max;
      this.toastr.info('Max value cannot greater than ' + max);
    }
  }
}
