import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para transformar unidades de peso.
 * Recibe Hectogramos (hg) y retorna Kilogramos (kg).
 * Uso: {{ pokemon.weight | kg }}
 */
@Pipe({
  name: 'kg',
  standalone: true, // Importante para usarlo en componentes standalone (Angular 17+)
})
export class KgPipe implements PipeTransform {
  /**
   * @param value El peso en Hectogramos (hg) proporcionado por la API.
   * @param decimals Número de decimales a mostrar (por defecto 1).
   * @returns El peso convertido a Kilogramos (kg) como string formateado.
   */
  transform(value: number | null | undefined, decimals: number = 1): string {
    if (value === null || value === undefined) {
      return '-';
    }

    // Conversión: 1 hg = 0.1 kg
    const kg = value / 10;

    // Retorna el número formateado con el número de decimales especificado
    return `${kg.toFixed(decimals)} kg`;
  }
}
