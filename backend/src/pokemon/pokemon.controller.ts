import { Controller, Get, Param, Post } from '@nestjs/common'
import { PokemonService } from './pokemon.service'

@Controller('api/v1/pokemons')
export class PokemonController {

  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll() {
    return this.pokemonService.findAll()
  }

  @Get(':pokedexId')
  findOne(@Param('pokedexId') pokedexId: number) {
    return this.pokemonService.findOne(pokedexId)
  }

  @Post('sync')
  sync() {
    return this.pokemonService.sync()
  }

}
