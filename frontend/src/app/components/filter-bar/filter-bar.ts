import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PokedexService } from '../../services/pokedex.service';
import { kgToHg } from '../../utils/unit-converter';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Consola de Filtros</h2>
      <form [formGroup]="filterForm" class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input formControlName="search" placeholder="Ej: Pikachu" class="p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
        <select formControlName="type" class="p-2 border border-slate-300 rounded">
          <option value="">- Todos los tipos -</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
        </select>
        <input type="number" formControlName="minWeight" placeholder="Peso min (kg)" class="p-2 border border-slate-300 rounded" />
        <input type="number" formControlName="maxWeight" placeholder="Peso max (kg)" class="p-2 border border-slate-300 rounded" />
      </form>
    </div>
  `
})
export class FilterBarComponent implements OnInit {
  private pokedexService = inject(PokedexService);

  filterForm = new FormGroup({
    search: new FormControl(''),
    type: new FormControl(''),
    minWeight: new FormControl<number | null>(null),
    maxWeight: new FormControl<number | null>(null),
  });

  ngOnInit() {
    this.filterForm.valueChanges.pipe(debounceTime(400)).subscribe((values) => {
      const params: any = { ...values };
      if (values.minWeight) params.minWeight = kgToHg(values.minWeight);
      if (values.maxWeight) params.maxWeight = kgToHg(values.maxWeight);
      this.pokedexService.loadPokemons(params).subscribe();
    });
  }
}
