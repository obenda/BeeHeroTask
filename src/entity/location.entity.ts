import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm'
import { Forcast } from './forcast.entity'

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column({ type: 'numeric', precision: 18, scale: 15 })
    latitude: number

  @Column({ type: 'numeric', precision: 18, scale: 15 })
    longitude: number

  @OneToMany(() => Forcast, forcast => forcast.location)
    forcasts: Forcast[]
}
