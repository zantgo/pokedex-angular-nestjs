import { IsInt, IsString, IsArray, IsOptional } from 'class-validator'

export class PokemonDto {
  id: string

  @IsInt()
  pokedexId: number

  @IsString()
  name: string

  @IsArray()
  types: string[]

  @IsInt()
  height: number

  @IsInt()
  weight: number
}