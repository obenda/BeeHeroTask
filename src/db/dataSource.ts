import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Location } from '../entity/location.entity'
import { Forcast } from '../entity/forcast.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Location, Forcast],
  migrations: [],
  subscribers: []
})

export const initializeDB: () => Promise<DataSource> = async () => {
  console.info('Initializing Database')
  return await AppDataSource.initialize()
}
