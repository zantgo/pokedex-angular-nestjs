import { Component, inject, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PokedexService } from '../../services/pokedex.service';
import { kgToHg, cmToDm } from '../../utils/unit-converter';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter-bar.html'
})
export class FilterBarComponent implements OnInit {
  private pokedexService = inject(PokedexService);
  transformationChange = output<string>();

  filterForm = new FormGroup({
    search: new FormControl(''),
    type: new FormControl(''),
    minWeight: new FormControl<number | null>(null),
    maxWeight: new FormControl<number | null>(null),
    minHeight: new FormControl<number | null>(null),
    maxHeight: new FormControl<number | null>(null),
    transformation: new FormControl('normal')
  });

  ngOnInit() {
    this.filterForm.get('transformation')?.valueChanges.subscribe(val => {
      this.transformationChange.emit(val || 'normal');
    });

    this.filterForm.valueChanges.pipe(debounceTime(400)).subscribe((values: any) => {
      const params: any = { ...values };
      if (values.minWeight) params.minWeight = kgToHg(values.minWeight);
      if (values.maxWeight) params.maxWeight = kgToHg(values.maxWeight);
      if (values.minHeight) params.minHeight = cmToDm(values.minHeight);
      if (values.maxHeight) params.maxHeight = cmToDm(values.maxHeight);

      delete params.transformation;
      Object.keys(params).forEach(k => params[k] === null && delete params[k]);

      params.page = 1; // <-- Agregado para reiniciar la paginación al filtrar

      this.pokedexService.loadPokemons(params).subscribe();
    });
  }

  clearFilters() {
    this.filterForm.reset({
      search: '', type: '', minWeight: null, maxWeight: null,
      minHeight: null, maxHeight: null, transformation: 'normal'
    });
  }
}
