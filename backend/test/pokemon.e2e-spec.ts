import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from '../src/pokemon/pokemon.module';
import { Pokemon } from '../src/pokemon/entity/pokemon.entity';
import { AllExceptionsFilter } from '../src/common/filters/http-exception.filter';

describe('PokemonController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3', // Cambiado a better-sqlite3
          database: ':memory:',
          entities: [Pokemon],
          synchronize: true,
        }),
        PokemonModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
    app.useGlobalFilters(new AllExceptionsFilter());
    
    await app.init();
  }, 30000); // Aumentado timeout a 30 segundos para evitar errores de espera

  afterAll(async () => {
    if (app) await app.close();
  });

  it('/api/v1/pokemons (GET) - Debería retornar lista vacía al inicio', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/pokemons')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toEqual([]);
  });
});
