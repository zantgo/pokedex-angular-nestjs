import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios'; 
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon } from './entity/pokemon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    HttpModule 
  ],
  controllers: [PokemonController],
  providers: [PokemonService]
})
export class PokemonModule {}