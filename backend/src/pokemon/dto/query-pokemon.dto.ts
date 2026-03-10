import { IsOptional, IsString, IsInt, Min, IsIn } from 'class-validator';

export class QueryPokemonDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minWeight?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxWeight?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minHeight?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxHeight?: number;

  @IsOptional()
  @IsString()
  @IsIn(['id', 'name', 'weight', 'height'])
  sortBy?: string = 'id';

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}