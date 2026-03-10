import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokedexState } from '../../state/pokedex.state';
import { KgPipe } from '../../pipes/kg.pipe';
import { CmPipe } from '../../pipes/cm.pipe';
import { InvertNamePipe } from '../../pipes/invert-name-pipe';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports:[CommonModule, RouterModule, KgPipe, CmPipe, InvertNamePipe],
  templateUrl: './pokemon-table.html',
  styleUrls:['./pokemon-table.css'],
})
export class PokemonTableComponent {
  private state = inject(PokedexState);
  public readonly pokemons = this.state.pokemonList;
  public readonly isLoading = this.state.isLoading;
  public readonly meta = this.state.currentMetadata;
}
