import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexState } from '../../state/pokedex.state';
import { KgPipe } from '../../pipes/kg.pipe';
import { CmPipe } from '../../pipes/cm.pipe';
import { InvertNamePipe } from '../../pipes/invert-name-pipe';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [CommonModule, KgPipe, CmPipe, InvertNamePipe],
  templateUrl: './pokemon-table.html',
  styleUrls: ['./pokemon-table.css'],
})
export class PokemonTableComponent {
  // Inyección del estado global (Angular 17+ inject function)
  private state = inject(PokedexState);

  // Exponemos los signals del estado para usarlos directamente en el HTML
  readonly pokemons = this.state.pokemonList;
  readonly isLoading = this.state.isLoading;
  readonly meta = this.state.currentMetadata;
}
