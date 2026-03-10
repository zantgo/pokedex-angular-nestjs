import { Component, OnInit, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common'; // Importa este pipe nativo
import { PokedexService } from './services/pokedex.service';
import { FilterBarComponent } from './components/filter-bar/filter-bar';
import { KgConverterPipe } from './pipes/kg-converter-pipe';
import { CmConverterPipe } from './pipes/cm-converter-pipe';
import { InvertNamePipe } from './pipes/invert-name-pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FilterBarComponent,
    KgConverterPipe,
    CmConverterPipe,
    InvertNamePipe,
    TitleCasePipe // Añadido aquí
  ],
  template: `
    <div class="max-w-6xl mx-auto p-8 bg-slate-50 min-h-screen">
      <h1 class="text-3xl font-bold text-blue-900 mb-8">Oak Labs | Analytics</h1>

      <app-filter-bar class="block mb-6" />

      @if (service.loading()) { <div class="text-center py-4">Cargando datos...</div> }

      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-100 border-b border-slate-200">
            <tr>
              <th class="p-4 text-slate-600 font-bold">NOMBRE</th>
              <th class="p-4 text-slate-600 font-bold">TIPO(S)</th>
              <th class="p-4 text-slate-600 font-bold">PESO</th>
              <th class="p-4 text-slate-600 font-bold">ALTURA</th>
              <th class="p-4 text-slate-600 font-bold">TRANSFORMACIÓN</th>
            </tr>
          </thead>
          <tbody>
            @for (p of service.pokemons(); track p.id) {
              <tr class="border-b border-slate-100 hover:bg-blue-50/50">
                <td class="p-4 font-semibold text-blue-800">{{ p.name | titlecase }}</td>
                <td class="p-4">
                  @for (t of p.types; track t) {
                    <span class="px-2 py-1 mr-1 text-[10px] font-bold text-white uppercase rounded bg-blue-500">{{ t }}</span>
                  }
                </td>
                <td class="p-4 text-slate-600">{{ p.weight | kgConverter }}</td>
                <td class="p-4 text-slate-600">{{ p.height | cmConverter }}</td>
                <td class="p-4 text-red-500 font-mono">{{ p.name | invertName }}</td>
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
  ngOnInit() { this.service.loadPokemons().subscribe(); }
}
