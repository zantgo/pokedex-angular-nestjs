import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'kgConverter', standalone: true })
export class KgConverterPipe implements PipeTransform {
  // Entrada esperada: Hectogramos (hg) | Salida: 'X.X kg'
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) return '0.0 kg';
    const kg = value / 10;
    return `${kg.toFixed(1)} kg`;
  }
}
