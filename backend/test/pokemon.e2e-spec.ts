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
        // Usamos SQLite en memoria para tests de integración
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Pokemon],
          synchronize: true,
        }),
        PokemonModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Aplicamos las mismas configuraciones que en main.ts para validar el contrato
    app.useGlobalPipes(new ValidationPipe({ transform: true, enableImplicitConversion: true }));
    app.useGlobalFilters(new AllExceptionsFilter());
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/pokemons/sync (POST) - Debería persistir datos', async () => {
    // Nota: Como es E2E, si no mockeamos el HttpService, intentará ir a la API real.
    // Para un test E2E puro, solemos mockear el HttpService en el módulo de test.
    return request(app.getHttpServer())
      .post('/api/v1/pokemons/sync')
      .expect(201); // O 200 dependiendo de tu implementación
  });

  it('/api/v1/pokemons (GET) - Debería retornar datos filtrados', async () => {
    // Primero verificamos que podemos obtener la lista
    const response = await request(app.getHttpServer())
      .get('/api/v1/pokemons')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');
  });

  it('/api/v1/pokemons?minWeight=99999 (GET) - Debería retornar lista vacía', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/pokemons?minWeight=99999')
      .expect(200);

    expect(response.body.data).toHaveLength(0);
  });
});
