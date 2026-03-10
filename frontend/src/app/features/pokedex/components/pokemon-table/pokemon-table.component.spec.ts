import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonTableComponent } from './pokemon-table.component';
import { PokedexState } from '../../state/pokedex.state';

describe('PokemonTableComponent', () => {
  let component: PokemonTableComponent;
  let fixture: ComponentFixture<PokemonTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTableComponent],
      providers: [PokedexState] // Proveemos el estado que inyecta el componente
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
