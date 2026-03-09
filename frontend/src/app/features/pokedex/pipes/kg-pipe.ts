import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kg',
})
export class KgPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
