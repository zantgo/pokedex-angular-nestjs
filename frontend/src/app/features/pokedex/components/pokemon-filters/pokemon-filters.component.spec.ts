import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PokemonFiltersComponent } from './pokemon-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterChange after debounceTime', fakeAsync(() => {
    // Espía para el EventEmitter
    const spy = jest.spyOn(component.filterChange, 'emit');

    // Cambiamos el valor del input search
    component.filterForm.patchValue({ search: 'pika' });

    // En este punto, no debería haberse emitido nada aún por el debounceTime
    expect(spy).not.toHaveBeenCalled();

    // Avanzamos el tiempo virtual en 300ms
    tick(300);

    // Ahora sí debería haberse emitido el evento
    expect(spy).toHaveBeenCalledWith({ search: 'pika' });
  }));

  it('should clean empty values before emitting', fakeAsync(() => {
    const spy = jest.spyOn(component.filterChange, 'emit');

    // Emitimos con campos vacíos
    component.filterForm.patchValue({ search: '', type: 'grass' });

    tick(300);

    // El objeto filtrado solo debe tener 'type'
    expect(spy).toHaveBeenCalledWith({ type: 'grass' });
  }));

  it('should not emit if debounce time has not passed', fakeAsync(() => {
    const spy = jest.spyOn(component.filterChange, 'emit');

    component.filterForm.patchValue({ search: 'pika' });

    // Avanzamos solo 100ms
    tick(100);
    expect(spy).not.toHaveBeenCalled();

    // Avanzamos el resto
    tick(200);
    expect(spy).toHaveBeenCalled();
  }));
});
