import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cmConverter', standalone: true })
export class CmConverterPipe implements PipeTransform {
  // Entrada esperada: Decímetros (dm) | Salida: 'X cm'
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) return '0 cm';
    const cm = value * 10;
    return `${cm} cm`;
  }
}
