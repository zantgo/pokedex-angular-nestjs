import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { PokemonQuery } from '../../models/pokemon-query.model';

@Component({
  selector: 'app-pokemon-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-filters.html',
  styleUrls: ['./pokemon-filters.css']
})
export class PokemonFiltersComponent implements OnInit, OnDestroy {
  // Emite los filtros hacia el componente padre (el listado)
  @Output() filterChange = new EventEmitter<PokemonQuery>();

  filterForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      search: [''],
      type: [''],
      minWeight: [null],
      maxWeight: [null],
      minHeight: [null],
      maxHeight: [null]
    });
  }

  ngOnInit(): void {
    // Escuchar cambios en el formulario con debounce
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300), // Espera 300ms tras la última tecla pulsada
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.destroy$) // Limpia la suscripción al destruir el componente
      )
      .subscribe((values) => {
        // Limpiar valores nulos o vacíos antes de emitir para mantener el contrato limpio
        const cleanFilters: any = {};
        Object.keys(values).forEach(key => {
          const value = values[key];
          if (value !== null && value !== undefined && value !== '') {
            cleanFilters[key] = value;
          }
        });

        this.filterChange.emit(cleanFilters as PokemonQuery);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
