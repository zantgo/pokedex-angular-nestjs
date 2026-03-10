import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { PokemonQuery } from '../models/pokemon-query.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes sin responder
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert units correctly when calling getPokemons', () => {
    // Escenario: El usuario busca peso entre 5kg y 30kg
    const query: PokemonQuery = {
      minWeight: 5,  // 5kg -> debería convertirse a 50hg
      maxWeight: 30, // 30kg -> debería convertirse a 300hg
      minHeight: 10, // 10cm -> debería convertirse a 1dm
    };

    service.getPokemons(query).subscribe();

    // Interceptamos la petición
    const req = httpMock.expectOne((request) => {
      // Validamos que los parámetros convertidos sean los correctos
      return request.params.get('minWeight') === '50' &&
             request.params.get('maxWeight') === '300' &&
             request.params.get('minHeight') === '1';
    });

    expect(req.request.method).toBe('GET');
    req.flush({ data: [], meta: {} }); // Respondemos con un mock vacío
  });

  it('should send search and type parameters without conversion', () => {
    const query: PokemonQuery = {
      search: 'pika',
      type: 'electric'
    };

    service.getPokemons(query).subscribe();

    const req = httpMock.expectOne((request) => {
      return request.params.get('search') === 'pika' &&
             request.params.get('type') === 'electric';
    });

    expect(req.request.method).toBe('GET');
    req.flush({ data: [], meta: {} });
  });
});
