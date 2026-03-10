import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Pokemon } from './entity/pokemon.entity';
import { QueryPokemonDto } from './dto/query-pokemon.dto';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);

  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(query: QueryPokemonDto) {
    // 1. Desestructuramos los parámetros del DTO con valores por defecto seguros
    const {
      page = 1,
      limit = 10,
      search,
      type,
      minWeight,
      maxWeight,
      minHeight,
      maxHeight,
      sortBy = 'id',
      sortOrder = 'ASC',
    } = query;

    // 2. Iniciamos el QueryBuilder apuntando a la entidad Pokemon (alias: 'pokemon')
    const queryBuilder = this.pokemonRepository.createQueryBuilder('pokemon');

    // 3. Aplicación de Filtros Dinámicos

    // Búsqueda parcial por nombre (case-insensitive usando ILIKE de PostgreSQL)
    if (search) {
      queryBuilder.andWhere('pokemon.name ILIKE :search', { search: `%${search}%` });
    }

    // Búsqueda exacta dentro del arreglo nativo de PostgreSQL usando ANY()
    if (type) {
      queryBuilder.andWhere(':type = ANY(pokemon.types)', { type });
    }

    // Filtros de Rango para Peso (Hectogramos)
    if (minWeight !== undefined) {
      queryBuilder.andWhere('pokemon.weight >= :minWeight', { minWeight });
    }
    if (maxWeight !== undefined) {
      queryBuilder.andWhere('pokemon.weight <= :maxWeight', { maxWeight });
    }

    // Filtros de Rango para Altura (Decímetros)
    if (minHeight !== undefined) {
      queryBuilder.andWhere('pokemon.height >= :minHeight', { minHeight });
    }
    if (maxHeight !== undefined) {
      queryBuilder.andWhere('pokemon.height <= :maxHeight', { maxHeight });
    }

    // 4. Ordenamiento
    queryBuilder.orderBy(`pokemon.${sortBy}`, sortOrder);

    // 5. Paginación (Cálculo de Offset y Limit)
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // 6. Ejecutamos la consulta. getManyAndCount() devuelve los datos y el total real (ignorando el LIMIT)
    const [pokemons, totalItems] = await queryBuilder.getManyAndCount();

    // 7. Retornamos el contrato estandarizado con la Metadata de Paginación
    return {
      data: pokemons,
      meta: {
        totalItems,
        itemCount: pokemons.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page
      }
    };
  }

  async findOne(pokedexId: number) {
    return this.pokemonRepository.findOne({
      where: { pokedexId }
    });
  }

  async sync() {
    this.logger.log('Iniciando sincronización con PokeAPI...');

    try {
      // 1. Obtener la lista base (Ej: 150 Pokémon)
      const limitList = 150;
      const listUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limitList}`;
      
      const { data: listData } = await firstValueFrom(this.httpService.get(listUrl));
      const pokemonUrls: string[] = listData.results.map((p: any) => p.url);

      // 2. Configurar el tamaño del lote (Batching)
      const batchSize = 50;
      let importedCount = 0;

      // 3. Procesamiento en lotes para no saturar la red ni la memoria
      for (let i = 0; i < pokemonUrls.length; i += batchSize) {
        const batchUrls = pokemonUrls.slice(i, i + batchSize);
        this.logger.log(`Procesando lote ${Math.floor(i / batchSize) + 1} de ${Math.ceil(pokemonUrls.length / batchSize)}...`);

        // Ejecutar las peticiones HTTP del lote de forma concurrente
        const batchPromises = batchUrls.map(url => firstValueFrom(this.httpService.get(url)));
        const batchResponses = await Promise.all(batchPromises);

        // 4. Normalizar la data cruda al formato de nuestra Base de Datos
        const pokemonsToSave = batchResponses.map(response => {
          const rawData = response.data;
          
          return this.pokemonRepository.create({
            pokedexId: rawData.id,
            name: rawData.name,
            types: rawData.types.map((t: any) => t.type.name),
            height: rawData.height,
            weight: rawData.weight,
          });
        });

        // 5. UPSERT en PostgreSQL
        await this.pokemonRepository.upsert(pokemonsToSave, ['pokedexId']);
        
        importedCount += pokemonsToSave.length;
      }

      this.logger.log(`¡Sincronización completada! ${importedCount} Pokémon procesados.`);

      return {
        status: 'success',
        message: 'Sincronización completada exitosamente.',
        importedCount,
      };

    } catch (error) {
      this.logger.error('Error catastrófico durante la sincronización', error);
      throw new InternalServerErrorException('Fallo al sincronizar los datos desde la PokeAPI.');
    }
  }
}