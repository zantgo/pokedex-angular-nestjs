/**
 * Interfaz que define la estructura de un Pokémon.
 * Esta interfaz es simétrica a la entidad `Pokemon` de TypeORM y al DTO del backend,
 * garantizando el contrato de datos entre ambas capas de la aplicación.
 */
export interface Pokemon {
  /** Identificador único UUID del sistema */
  id: string;

  /** Identificador oficial de la Pokedex Nacional (PokeAPI) */
  pokedexId: number;

  /** Nombre de la especie (almacenado en minúsculas) */
  name: string;

  /** Arreglo con los tipos biológicos (ej: ["grass", "poison"]) */
  types: string[];

  /** Altura en unidades crudas (Decímetros) */
  height: number;

  /** Peso en unidades crudas (Hectogramos) */
  weight: number;

  /** Fecha de creación en el sistema (ISO String) */
  createdAt?: Date;

  /** Última actualización en el sistema (ISO String) */
  updatedAt?: Date;
}

/**
 * Interfaz para la respuesta paginada del backend.
 * Asegura que el frontend sepa manejar la estructura del contrato definida en API_SPEC.md
 */
export interface PokemonResponse {
  data: Pokemon[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
