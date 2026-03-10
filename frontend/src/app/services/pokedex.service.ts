import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokedexResponse } from '../models/pokemon.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokedexService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/v1';

  // Signals para el estado
  pokemons = signal<Pokemon[]>([]);
  loading = signal<boolean>(false);

  loadPokemons(params: any = {}) {
    this.loading.set(true);
    return this.http.get<PokedexResponse>(`${this.API_URL}/pokemons`, { params }).pipe(
      tap((res) => {
        this.pokemons.set(res.data);
        this.loading.set(false);
      })
    );
  }
}
