import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { QueryPokemonDto } from './dto/query-pokemon.dto';

@Controller('api/v1/pokemons')
export class PokemonController {

  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(@Query() query: QueryPokemonDto) {
    return this.pokemonService.findAll(query);
  }

  @Get(':pokedexId')
  findOne(@Param('pokedexId') pokedexId: number) {
    return this.pokemonService.findOne(pokedexId);
  }

  @Post('sync')
  sync() {
    return this.pokemonService.sync();
  }

}