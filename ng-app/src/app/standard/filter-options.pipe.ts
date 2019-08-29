import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOptions'
})
export class FilterOptionsPipe implements PipeTransform {

  transform(options: any[], value: any): any {
    if (!options) {
      return;
    }

    if (!value) {
      return options;
    }

    if (typeof value === 'object') {
      value = value.name;
    }

    return options.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }

}
