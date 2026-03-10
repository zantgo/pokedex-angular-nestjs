import { Component, OnInit, inject } from '@angular/core';
import { PokedexService } from './services/pokedex.service';
import { FilterBarComponent } from './components/filter-bar/filter-bar';
import { KgConverterPipe } from './pipes/kg-converter-pipe';
import { CmConverterPipe } from './pipes/cm-converter-pipe';
import { InvertNamePipe } from './pipes/invert-name-pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FilterBarComponent, KgConverterPipe, CmConverterPipe, InvertNamePipe],
  template: `
    <div class="max-w-6xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6 text-indigo-700">Pokedex Analytics</h1>

      <app-filter-bar class="block mb-6" />

      @if (service.loading()) { <div class="text-center py-4">Cargando datos...</div> }

      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Peso</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Altura</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            @for (p of service.pokemons(); track p.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ p.name | invertName }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ p.weight | kgConverter }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ p.height | cmConverter }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class App implements OnInit {
  protected service = inject(PokedexService);

  ngOnInit() {
    this.service.loadPokemons().subscribe();
  }
}
