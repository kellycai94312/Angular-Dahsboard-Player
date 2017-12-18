import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matches',
  pure: false
})
export class MatchFilterPipe implements PipeTransform {

  transform(items: any[], attr: any, filter: any): any {
    if (!items || !attr || !filter) {
      return items;
    }
    return items.filter(item => item[attr].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}
