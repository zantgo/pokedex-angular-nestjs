import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PokedexService } from '../../services/pokedex.service';
import { kgToHg, cmToDm } from '../../utils/unit-converter';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="filterForm" class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
      <input formControlName="search" placeholder="Buscar por nombre..." class="p-2 border rounded" />
      <input formControlName="type" placeholder="Tipo (ej: grass)..." class="p-2 border rounded" />
      <input type="number" formControlName="minWeight" placeholder="Peso mín (kg)" class="p-2 border rounded" />
      <input type="number" formControlName="maxWeight" placeholder="Peso máx (kg)" class="p-2 border rounded" />
    </form>
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
    this.filterForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((values) => {
        const params: any = { ...values };

        // Convertimos kg a hg antes de enviar al backend
        if (values.minWeight) params.minWeight = kgToHg(values.minWeight);
        if (values.maxWeight) params.maxWeight = kgToHg(values.maxWeight);

        this.pokedexService.loadPokemons(params).subscribe();
      });
  }
}
