import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para transformar nombres de Pokémon a formato visual.
 * Convierte el nombre a mayúsculas y maneja valores nulos/undefined.
 * Uso: {{ pokemon.name | invertName }}
 */
@Pipe({
  name: 'invertName',
  standalone: true,
})
export class InvertNamePipe implements PipeTransform {
  /**
   * @param value El nombre del Pokémon (string).
   * @returns El nombre en mayúsculas o un guion si el valor no es válido.
   */
  transform(value: string | null | undefined): string {
    // Protección contra valores nulos o vacíos durante la carga
    if (!value || value.trim().length === 0) {
      return '-';
    }

    // Transformación: Nombre en mayúsculas (se puede extender a otros formatos en el futuro)
    return value.toUpperCase();
  }
}
