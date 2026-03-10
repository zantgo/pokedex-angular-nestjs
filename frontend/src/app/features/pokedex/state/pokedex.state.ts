import { Injectable, signal, computed } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

/**
 * Estado global del módulo Pokedex.
 * Utilizamos Signals para una reactividad granular y eficiente (Angular 17+).
 */
@Injectable({
  providedIn: 'root',
})
export class PokedexState {
  // --- Estados Writable (Pueden ser modificados internamente) ---
  private pokemons = signal<Pokemon[]>([]);
  private loading = signal<boolean>(false);
  private totalItems = signal<number>(0);
  private currentPage = signal<number>(1);
  private itemsPerPage = signal<number>(10);

  // --- Estados Computed (Derivados automáticamente) ---
  // Estos se recalculan solos cuando cambian los signals que los componen
  readonly pokemonList = computed(() => this.pokemons());
  readonly isLoading = computed(() => this.loading());
  readonly totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));
  readonly currentMetadata = computed(() => ({
    currentPage: this.currentPage(),
    totalPages: this.totalPages(),
    totalItems: this.totalItems()
  }));

  // --- Métodos de Actualización ---

  setPokemons(data: Pokemon[], total: number) {
    this.pokemons.set(data);
    this.totalItems.set(total);
  }

  setLoading(status: boolean) {
    this.loading.set(status);
  }

  setPagination(page: number, limit: number) {
    this.currentPage.set(page);
    this.itemsPerPage.set(limit);
  }

  /**
   * Limpia el estado (útil al navegar fuera o resetear filtros)
   */
  resetState() {
    this.pokemons.set([]);
    this.totalItems.set(0);
    this.currentPage.set(1);
    this.loading.set(false);
  }
}
