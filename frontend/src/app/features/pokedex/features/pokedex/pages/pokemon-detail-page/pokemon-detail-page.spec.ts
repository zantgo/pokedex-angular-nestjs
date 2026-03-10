import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailPage } from './pokemon-detail-page';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../../services/pokemon.service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('PokemonDetailPage', () => {
  let component: PokemonDetailPage;
  let fixture: ComponentFixture<PokemonDetailPage>;

  beforeEach(async () => {
    // 1. Mockeamos la ruta para que devuelva el ID "1"
    const mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    // 2. Mockeamos el servicio para que no haga llamadas HTTP reales
    const mockPokemonService = {
      getPokemon: vi.fn().mockReturnValue(of({
        id: 'uuid-1', pokedexId: 1, name: 'bulbasaur', types: ['grass'], height: 7, weight: 69
      }))
    };

    await TestBed.configureTestingModule({
      imports: [PokemonDetailPage],
      providers:[
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PokemonService, useValue: mockPokemonService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
