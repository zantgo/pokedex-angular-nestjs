import { Component, inject, OnInit } from '@angular/core';
import { PokedexState } from '../../state/pokedex.state';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonFiltersComponent } from '../../components/pokemon-filters/pokemon-filters.component';
import { PokemonTableComponent } from '../../components/pokemon-table/pokemon-table.component';
import { PokemonQuery } from '../../models/pokemon-query.model';

@Component({
  selector: 'app-pokemon-list-page',
  standalone: true,
  imports: [PokemonFiltersComponent, PokemonTableComponent],
  templateUrl: './pokemon-list-page.html',
})
export class PokemonListPageComponent implements OnInit {
  private state = inject(PokedexState);
  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    // Carga inicial al entrar en la página
    this.loadPokemons({});
  }

  /**
   * Este método es llamado cuando el componente de filtros emite un cambio.
   */
  onFilterChange(filters: PokemonQuery): void {
    this.loadPokemons(filters);
  }

  /**
   * Orquestación de la llamada a la API y actualización del estado reactivo
   */
  private loadPokemons(filters: PokemonQuery): void {
    this.state.setLoading(true);

    this.pokemonService.getPokemons(filters).subscribe({
      next: (response) => {
        // Actualizamos el estado global con la data y la metadata
        this.state.setPokemons(response.data, response.meta.totalItems);
        this.state.setPagination(response.meta.currentPage, response.meta.itemsPerPage);
        this.state.setLoading(false);
      },
      error: (err) => {
        console.error('Error al cargar Pokémon:', err);
        this.state.setLoading(false);
      }
    });
  }
}
