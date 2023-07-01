import 'dotenv/config'
import * as express from 'express'
import { initializeDB } from './db/dataSource'
import { seedDataBase } from './db/seeding'
import { routes } from './routes'

initializeDB().then(() => {
  console.info('Done Initializing Database')
  seedDataBase().then(() => {
    const app = express()
    app.use(express.json())
    app.use('/', routes)

    console.log('Application is up and running')
    app.listen(3000)
  }).catch((error) => {
    console.error('Failed seeding database', error)
  })
}).catch((error) => {
  console.error('Error during Data Source initialization', error)
})
