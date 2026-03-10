import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListPage } from './pokemon-list-page';
import { PokemonService } from '../../../../services/pokemon.service';
import { PokedexState } from '../../../../state/pokedex.state';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('PokemonListPage', () => {
  let component: PokemonListPage;
  let fixture: ComponentFixture<PokemonListPage>;

  beforeEach(async () => {
    // Mockeamos el servicio para que devuelva una lista vacía de forma síncrona
    const mockPokemonService = {
      getPokemons: vi.fn().mockReturnValue(of({
        data:[],
        meta: { totalItems: 0, currentPage: 1, itemsPerPage: 10, totalPages: 0 }
      }))
    };

    await TestBed.configureTestingModule({
      imports: [PokemonListPage],
      providers:[
        PokedexState, // Proveemos el estado global real (o mock)
        { provide: PokemonService, useValue: mockPokemonService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Esto dispara el ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
