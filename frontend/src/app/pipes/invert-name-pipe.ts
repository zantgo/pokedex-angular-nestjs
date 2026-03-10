import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'invertName', standalone: true })
export class InvertNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.split('').reverse().join('').toUpperCase();
  }
}
