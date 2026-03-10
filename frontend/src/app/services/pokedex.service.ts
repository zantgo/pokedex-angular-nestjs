import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemon, PokedexResponse, PokemonFilterParams } from '../models/pokemon.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokedexService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/v1';
  pokemons = signal<Pokemon[]>([]);
  loading = signal<boolean>(false);
  meta = signal<PokedexResponse['meta'] | null>(null); // <--- Guardará la info de paginación
  currentParams = signal<PokemonFilterParams>({});     // <--- Guardará los filtros actuales
  loadPokemons(params: PokemonFilterParams = {}) {
    this.loading.set(true);
    this.currentParams.set(params); // Guardamos el estado actual de la búsqueda
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '')
        httpParams = httpParams.set(key, value.toString());
    });
    return this.http.get<PokedexResponse>(`${this.API_URL}/pokemons`, { params: httpParams })
      .pipe(tap(res => {
        this.pokemons.set(res.data);
        this.meta.set(res.meta); // Actualizamos la paginación con la respuesta del backend
        this.loading.set(false); }));
  }
}
