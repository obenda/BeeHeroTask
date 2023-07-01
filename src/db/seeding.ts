import * as moment from 'moment'
import { AppDataSource } from './dataSource'
import { Location } from '../entity/location.entity'
import { Forcast } from '../entity/forcast.entity'
import { fetchLocation, fetchForcast } from '../services/openweatherService'
import { OpenWeatherLocation, OpenWeatherForcast } from '../types'

export const seedDataBase: () => Promise<void> = async () => {
  console.info('Seeding Database')
  await deletePreviousData()
  console.info('Previous data was removed...')
  await seedLocations()
  console.info('Locations information was retreived...')
  await seedForcasts()
  console.info('3 hour weather forecasts for the next 3 days was retreived...')
  console.info('Done Seeding Database')
}

const deletePreviousData: () => Promise<void> = async () => {
  await AppDataSource.getRepository(Forcast).delete({})
  await AppDataSource.getRepository(Location).delete({})
}

const seedLocations: () => Promise<void> = async () => {
  // using p-limit\p-throttle in here is needed in case we want to bring many locations at once
  if (process.env.OPEN_WEATHER_NEEDED_LOCATIONS != null) {
    await Promise.all(process.env.OPEN_WEATHER_NEEDED_LOCATIONS.split(',').map(seedLocation))
  }
}

const seedLocation: (locationName: string) => Promise<void> = async (locationName) => {
  const location = await fetchLocation(locationName)
  if (location != null) {
    await saveLocation(location)
  }
}

const saveLocation: (locationInfo: OpenWeatherLocation) => Promise<void> = async (locationInfo) => {
  const { name, lat: latitude, lon: longitude } = locationInfo
  const locationsRepository = AppDataSource.getRepository(Location)
  await locationsRepository.save(locationsRepository.create({ name, latitude, longitude }))
}

const seedForcasts: () => Promise<void> = async () => {
  const allLocations = await AppDataSource.getRepository(Location).find()
  await Promise.all(allLocations.map(seedLocationForcast))
}

const seedLocationForcast: (location: Location) => Promise<void> = async (location) => {
  await saveLocationForcast(location, await fetchForcast(location.latitude, location.longitude))
}

const saveLocationForcast: (location: Location, locationForcastPoints: OpenWeatherForcast[]) => Promise<void> = async (location, locationForcastPoints) => {
  const forcastRepository = AppDataSource.getRepository(Forcast)
  const threeDaysFromNow = moment().add(3, 'days').toDate()
  const nextThreeDaysForcasts = locationForcastPoints
    .filter(forcastPoint => forcastPoint.datetime <= threeDaysFromNow)
    .map(forcastPoint => forcastRepository.create({ location, ...forcastPoint }))

  await forcastRepository.save(nextThreeDaysForcasts)
}
