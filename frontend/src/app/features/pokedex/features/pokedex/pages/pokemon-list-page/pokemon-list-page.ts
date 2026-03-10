import { Component, inject, OnInit } from '@angular/core';
import { PokedexState } from '../../../../state/pokedex.state';
import { PokemonService } from '../../../../services/pokemon.service';
// Ajusta la ruta a los componentes: subimos 4 niveles para salir de la carpeta pages
import { PokemonFiltersComponent } from '../../../../components/pokemon-filters/pokemon-filters.component';
import { PokemonTableComponent } from '../../../../components/pokemon-table/pokemon-table.component';
import { PokemonQuery } from '../../../../models/pokemon-query.model';

@Component({
  selector: 'app-pokemon-list-page',
  standalone: true,
  imports: [PokemonFiltersComponent, PokemonTableComponent],
  templateUrl: './pokemon-list-page.html',
})
export class PokemonListPage implements OnInit {
  private state = inject(PokedexState);
  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.loadPokemons({});
  }

  onFilterChange(filters: PokemonQuery): void {
    this.loadPokemons(filters);
  }

  private loadPokemons(filters: PokemonQuery): void {
    this.state.setLoading(true);
    this.pokemonService.getPokemons(filters).subscribe({
      next: (response) => {
        this.state.setPokemons(response.data, response.meta.totalItems);
        this.state.setLoading(false);
      },
      error: (err) => {
        console.error('Error al cargar Pokémon:', err);
        this.state.setLoading(false);
      }
    });
  }
}
