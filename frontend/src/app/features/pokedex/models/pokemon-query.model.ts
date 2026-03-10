/**
 * Interfaz para los parámetros de búsqueda y filtrado de Pokémon.
 * Esta interfaz es simétrica al QueryPokemonDto del Backend.
 * Permite tipar correctamente las peticiones HTTP GET con filtros.
 */
export interface PokemonQuery {
  // Paginación
  page?: number;
  limit?: number;

  // Búsqueda por texto (Nombre parcial)
  search?: string;

  // Filtrado exacto
  type?: string;

  // Filtros de Rango (Unidades crudas: hg y dm)
  minWeight?: number;
  maxWeight?: number;
  minHeight?: number;
  maxHeight?: number;

  // Ordenamiento
  sortBy?: 'id' | 'name' | 'weight' | 'height';
  sortOrder?: 'ASC' | 'DESC';
}
