import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cm',
})
export class CmPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
