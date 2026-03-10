import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para invertir el nombre de un Pokémon.
 * Ejemplo: "bulbasaur" -> "ruasablub"
 * Uso: {{ pokemon.name | invertName }}
 */
@Pipe({
  name: 'invertName',
  standalone: true,
})
export class InvertNamePipe implements PipeTransform {
  /**
   * @param value El nombre del Pokémon (string).
   * @returns El nombre invertido o un guion si el valor no es válido.
   */
  transform(value: string | null | undefined): string {
    // Protección contra valores nulos, vacíos o espacios
    if (!value || value.trim().length === 0) {
      return '-';
    }

    // Lógica de inversión: split -> reverse -> join
    return value.split('').reverse().join('');
  }
}