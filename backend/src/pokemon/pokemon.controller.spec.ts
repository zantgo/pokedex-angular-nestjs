import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;

  // Creamos un mock simple del servicio
  const mockPokemonService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    sync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: mockPokemonService,
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call pokemonService.findAll', async () => {
    mockPokemonService.findAll.mockResolvedValue({ data: [] });
    await controller.findAll({} as any);
    expect(mockPokemonService.findAll).toHaveBeenCalled();
  });
});
