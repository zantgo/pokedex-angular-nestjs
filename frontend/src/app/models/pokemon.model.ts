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
