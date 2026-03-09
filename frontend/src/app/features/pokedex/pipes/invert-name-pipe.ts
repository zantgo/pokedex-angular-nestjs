import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invertName',
})
export class InvertNamePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
