import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Pokemon } from './entity/pokemon.entity'

@Injectable()
export class PokemonService {

  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  async findAll() {

    const pokemons = await this.pokemonRepository.find()

    return {
      data: pokemons,
      meta: {
        totalItems: pokemons.length,
        itemCount: pokemons.length,
        itemsPerPage: pokemons.length,
        totalPages: 1,
        currentPage: 1
      }
    }

  }

  async findOne(pokedexId: number) {
    return this.pokemonRepository.findOne({
      where: { pokedexId }
    })
  }

  async sync() {

    // temporal: solo respuesta mock
    return {
      status: "success",
      message: "Sync endpoint working",
      importedCount: 0
    }

  }

}
