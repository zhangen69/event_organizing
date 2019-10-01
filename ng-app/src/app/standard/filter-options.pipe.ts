import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOptions'
})
export class FilterOptionsPipe implements PipeTransform {

  transform(options: any[], value: any, refName: string): any {
    if (!options) {
      return;
    }

    if (!value) {
      return options;
    }

    if (typeof value === 'object') {
      value = value[refName];
    }

    if (!refName && typeof value === 'string') {
      return options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
    }

    return options.filter(option => option[refName].toLowerCase().includes(value.toLowerCase()));
  }

}
