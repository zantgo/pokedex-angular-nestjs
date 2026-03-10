// frontend/src/app/app.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { PokedexService } from './services/pokedex.service';
import { FilterBarComponent } from './components/filter-bar/filter-bar';
import { KgConverterPipe } from './pipes/kg-converter-pipe';
import { CmConverterPipe } from './pipes/cm-converter-pipe';
import { InvertNamePipe } from './pipes/invert-name-pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[FilterBarComponent, KgConverterPipe, CmConverterPipe, InvertNamePipe, TitleCasePipe],
  template: `
    <div class="max-w-6xl mx-auto p-8 bg-slate-50 min-h-screen">
      <h1 class="text-3xl font-bold text-blue-900 mb-8">Oak Labs | Analytics</h1>
      <app-filter-bar (transformationChange)="currentTransformation.set($event)" />

      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-slate-100 border-b">
            <tr>
              <th class="p-4">NOMBRE</th>
              <th class="p-4">TIPO(S)</th>
              <th class="p-4">PESO</th>
              <th class="p-4">ALTURA</th>
              <th class="p-4">TRANSFORMACIÓN</th>
            </tr>
          </thead>
          <tbody>
            @for (p of service.pokemons(); track p.id) {
              <tr class="border-b hover:bg-blue-50">
                <td class="p-4 font-semibold text-blue-800">{{ p.name | titlecase }}</td>
                <td class="p-4">
                  @for (t of p.types; track t) {
                    <span class="px-2 py-1 mr-1 text-[10px] text-white rounded bg-blue-500">{{ t }}</span>
                  }
                </td>
                <td class="p-4">{{ p.weight | kgConverter }}</td>
                <td class="p-4">{{ p.height | cmConverter }}</td>
                <td class="p-4 text-red-500 font-mono">
                  {{ currentTransformation() === 'invert' ? (p.name | invertName) : p.name }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- 👇 NUEVA SECCIÓN DE PAGINACIÓN 👇 -->
      @if (service.meta(); as meta) {
        <div class="flex items-center justify-between bg-white p-4 mt-4 rounded-xl shadow-sm border border-slate-200">
          <div class="text-sm text-slate-500">
            Mostrando página <span class="font-bold text-slate-800">{{ meta.currentPage }}</span>
            de <span class="font-bold text-slate-800">{{ meta.totalPages || 1 }}</span>
            (Total: {{ meta.totalItems }} especímenes)
          </div>
          <div class="flex gap-2">
            <button
              (click)="changePage(meta.currentPage - 1)"
              [disabled]="meta.currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Anterior
            </button>
            <button
              (click)="changePage(meta.currentPage + 1)"
              [disabled]="meta.currentPage >= meta.totalPages || meta.totalPages === 0"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      }
      <!-- 👆 FIN PAGINACIÓN 👆 -->

    </div>
  `
})
export class App implements OnInit {
  protected service = inject(PokedexService);
  protected currentTransformation = signal<string>('normal');

  ngOnInit() {
    this.service.loadPokemons().subscribe();
  }

  // 👇 NUEVA FUNCIÓN 👇
  changePage(newPage: number) {
    const meta = this.service.meta();
    if (!meta || newPage < 1 || newPage > meta.totalPages) return;

    // Tomamos los filtros actuales y solo le sobreescribimos la página
    const currentFilters = this.service.currentParams();
    this.service.loadPokemons({ ...currentFilters, page: newPage }).subscribe();
  }
}
