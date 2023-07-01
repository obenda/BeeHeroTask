import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Index } from 'typeorm'
import { Location } from './location.entity'

@Entity()
export class Forcast extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Index()
  @ManyToOne(() => Location, location => location.forcasts)
    location: Location

  @Column({ type: 'timestamptz' })
    datetime: Date

  @Column({ type: 'numeric', precision: 5, scale: 2 })
    temp: number

  @Index()
  @Column({ type: 'numeric', precision: 5, scale: 2 })
    feels_like: number

  @Index()
  @Column()
    humidity: number
}
