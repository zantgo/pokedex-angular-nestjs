import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Pokemon {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  type: string

  @Column()
  height: number

  @Column()
  weight: number

}