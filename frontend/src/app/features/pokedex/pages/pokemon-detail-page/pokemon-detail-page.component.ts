import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { KgPipe } from '../../pipes/kg.pipe';
import { CmPipe } from '../../pipes/cm.pipe';
import { InvertNamePipe } from '../../pipes/invert-name-pipe';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [CommonModule, KgPipe, CmPipe, InvertNamePipe],
  templateUrl: './pokemon-detail-page.html',
})
export class PokemonDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  // Usamos signal para gestionar el detalle localmente
  pokemon = signal<Pokemon | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    // Obtenemos el ID de la URL
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.loadPokemonDetail(Number(idParam));
    }
  }

  private loadPokemonDetail(id: number): void {
    this.isLoading.set(true);
    this.pokemonService.getPokemon(id).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando detalle:', err);
        this.isLoading.set(false);
      }
    });
  }
}
