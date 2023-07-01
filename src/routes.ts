import * as express from 'express'
import * as moment from 'moment'
import { Request, Response, RequestHandler } from 'express'
import { AppDataSource } from './db/dataSource'
import { avgTmpPerCityPerDayQuery, lowestHumidQuery, feelsLikeRankQuery } from './db/queries'

export const routes = express.Router()

// The wrapping of the async handler and casting to RequestHandler is some workaround I found to avoid TS error
// See https://stackoverflow.com/questions/67114152/typescript-eslint-throwing-a-promise-returned-error-on-a-express-router-async

routes.get('/avg_tmp_per_city_per_day', (async (req: Request, res: Response) => {
  // Here I decided to keep it as raw and not manupulate it to be grouped by location since it might be easier for
  // the client to manipulate it when it is flat
  // but it is certinly depends on the usage, in some cases it is best to serve it in the way it is intended to be used
  const rawData = await AppDataSource.query(avgTmpPerCityPerDayQuery)
  res.status(200).json(rawData.map(item => ({ ...item, date: moment(item.date).format('YYYY-MM-DD') })))
}) as RequestHandler)

routes.get('/lowest_humid', (async (req: Request, res: Response) => {
  const rawData = await AppDataSource.query(lowestHumidQuery)

  // I only handled this case specifically since the client expects to get one definitive answer
  if (rawData == null || rawData.length === 0) {
    res.status(404).json({ error: 'No forcasts found' })
  }

  res.status(200).json(rawData[0])
}) as RequestHandler)

routes.get('/feels_like_rank', (async (_req: Request, res: Response) => {
  const rawData = await AppDataSource.query(feelsLikeRankQuery)
  res.status(200).json(rawData)
}) as RequestHandler)
