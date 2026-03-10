import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Pokemon } from './entity/pokemon.entity';
import { of } from 'rxjs';

describe('PokemonService', () => {
  let service: PokemonService;

  // Mocks de dependencias
  const mockRepository = {
    find: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue({
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    }),
    create: jest.fn().mockImplementation((dto) => dto), // Importante: retornar el objeto para el upsert
    upsert: jest.fn().mockResolvedValue({}),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: getRepositoryToken(Pokemon), useValue: mockRepository },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated data', async () => {
      const query = { page: 1, limit: 10 };
      const result = await service.findAll(query as any);
      
      expect(result).toHaveProperty('data');
      expect(result.meta.currentPage).toBe(1);
    });
  });

  describe('sync', () => {
    it('should call PokeAPI and upsert data', async () => {
      // 1. Mock de la lista de URLs
      mockHttpService.get.mockReturnValueOnce(of({
        data: { results: [{ url: 'http://test.com/1' }] }
      }));

      // 2. Mock de la respuesta del detalle de 1 Pokémon
      mockHttpService.get.mockReturnValueOnce(of({
        data: { 
          id: 1, 
          name: 'bulbasaur', 
          types: [{ type: { name: 'grass' } }], 
          height: 7, 
          weight: 69 
        }
      }));

      const result = await service.sync();
      
      expect(result.status).toBe('success');
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.upsert).toHaveBeenCalled();
    });
  });
});
