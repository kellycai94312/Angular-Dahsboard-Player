import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, precision: number): number {
    const multiplier = Math.pow(10, precision) * 1.;
    return Math.round(value * multiplier) / multiplier;
  }

}
