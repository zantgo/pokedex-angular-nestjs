import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';
import { PokemonQuery } from '../models/pokemon-query.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // Nota: Asegúrate de que esta URL coincida con tu configuración de Docker/Localhost
  private readonly baseUrl = 'http://localhost:3000/api/v1/pokemons';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de pokémon aplicando filtros y conversión de unidades.
   * @param query Objeto con los filtros del usuario.
   */
  getPokemons(query: PokemonQuery): Observable<PokemonResponse> {
    let params = new HttpParams();

    // 1. Lógica de Conversión Matemática (del Frontend hacia el Backend)
    // El backend recibe 'hg' y 'dm', el usuario ingresa 'kg' y 'cm'.
    const processedQuery = { ...query };

    if (processedQuery.minWeight !== undefined) {
      processedQuery.minWeight *= 10; // kg a hg
    }
    if (processedQuery.maxWeight !== undefined) {
      processedQuery.maxWeight *= 10; // kg a hg
    }
    if (processedQuery.minHeight !== undefined) {
      processedQuery.minHeight /= 10; // cm a dm
    }
    if (processedQuery.maxHeight !== undefined) {
      processedQuery.maxHeight /= 10; // cm a dm
    }

    // 2. Construcción dinámica de HttpParams
    Object.keys(processedQuery).forEach((key) => {
      const value = (processedQuery as any)[key];
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PokemonResponse>(this.baseUrl, { params });
  }

  /**
   * Obtiene el detalle de un único Pokémon
   */
  getPokemon(pokedexId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${pokedexId}`);
  }

  /**
   * Dispara la ingesta de datos
   */
  syncPokemons(): Observable<{ status: string; message: string; importedCount: number }> {
    return this.http.post<{ status: string; message: string; importedCount: number }>(
      `${this.baseUrl}/sync`,
      {}
    );
  }
}
