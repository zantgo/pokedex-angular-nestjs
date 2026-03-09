import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('pokemons')
export class Pokemon {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'pokedex_id',
    type: 'int',
    unique: true
  })
  pokedexId: number

  @Column({
    type: 'varchar',
    length: 100
  })
  name: string

  @Column('text', {
    array: true
  })
  types: string[]

  @Column({
    type: 'int'
  })
  height: number

  @Column({
    type: 'int'
  })
  weight: number

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date
}