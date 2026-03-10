import { Component, OnInit, inject } from '@angular/core';
import { PokedexService } from './services/pokedex.service';
import { KgConverterPipe } from './pipes/kg-converter-pipe';
import { CmConverterPipe } from './pipes/cm-converter-pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KgConverterPipe, CmConverterPipe],
  template: `
    <div class="p-8">
      @if (service.loading()) { <p>Cargando datos...</p> }

      <table class="w-full border-collapse">
        <thead>
          <tr><th>Nombre</th><th>Peso</th><th>Altura</th></tr>
        </thead>
        <tbody>
          @for (p of service.pokemons(); track p.id) {
            <tr class="border-b">
              <td>{{ p.name }}</td>
              <td>{{ p.weight | kgConverter }}</td>
              <td>{{ p.height | cmConverter }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class App implements OnInit {
  protected service = inject(PokedexService);

  ngOnInit() {
    this.service.loadPokemons().subscribe();
  }
}
