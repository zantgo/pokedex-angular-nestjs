export interface Pokemon {
  id: string;
  pokedexId: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
}

export interface PokedexResponse {
  data: Pokemon[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PokemonFilterParams {
  search?: string;
  type?: string;
  minWeight?: number;
  maxWeight?: number;
  minHeight?: number;
  maxHeight?: number;
  page?: number;  // <--- NUEVO
  limit?: number; // <--- NUEVO
}
