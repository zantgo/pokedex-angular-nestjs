import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para transformar unidades de altura.
 * Recibe Decímetros (dm) y retorna Centímetros (cm).
 * Uso: {{ pokemon.height | cm }}
 */
@Pipe({
  name: 'cm',
  standalone: true,
})
export class CmPipe implements PipeTransform {
  /**
   * @param value La altura en Decímetros (dm) proporcionada por la API.
   * @returns La altura convertida a Centímetros (cm) como string formateado.
   */
  transform(value: number | null | undefined): string {
    // Si el valor no existe (durante la carga inicial), devolvemos un guion
    if (value === null || value === undefined) {
      return '-';
    }

    // Conversión: 1 dm = 10 cm
    const cm = value * 10;

    return `${cm} cm`;
  }
}
