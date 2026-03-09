import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'http://localhost:3000/api/v1/pokemons';

  constructor(private http: HttpClient) {}

  getPokemons(params?: any): Observable<{ data: Pokemon[]; meta: any }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<{ data: Pokemon[]; meta: any }>(this.baseUrl, { params: httpParams });
  }

  getPokemon(pokedexId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${pokedexId}`);
  }

  syncPokemons(): Observable<any> {
    return this.http.post(`${this.baseUrl}/sync`, {});
  }
}
