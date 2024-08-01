import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedDecimal',
  standalone: true
})
export class FixedDecimalPipe implements PipeTransform {

  transform(value: number, digits: number = 3): string {
    return value.toFixed(digits);
  }

}
