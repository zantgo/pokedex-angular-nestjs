import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFiltersComponent } from './pokemon-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';

describe('PokemonFiltersComponent', () => {
  let component: PokemonFiltersComponent;
  let fixture: ComponentFixture<PokemonFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PokemonFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Usamos los timers falsos nativos de Vitest
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Restauramos el tiempo real al terminar cada test
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterChange after debounceTime', () => {
    const spy = vi.spyOn(component.filterChange, 'emit');

    component.filterForm.patchValue({ search: 'pika' });
    expect(spy).not.toHaveBeenCalled();

    // Avanzamos el reloj de Vitest
    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalledWith({ search: 'pika' });
  });

  it('should clean empty values before emitting', () => {
    const spy = vi.spyOn(component.filterChange, 'emit');

    component.filterForm.patchValue({ search: '', type: 'grass' });
    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalledWith({ type: 'grass' });
  });

  it('should not emit if debounce time has not passed', () => {
    const spy = vi.spyOn(component.filterChange, 'emit');

    component.filterForm.patchValue({ search: 'pika' });

    vi.advanceTimersByTime(100);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(spy).toHaveBeenCalled();
  });
});
