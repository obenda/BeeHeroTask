import axios from 'axios'
import { OpenWeatherLocation, OpenWeatherForcast } from '../types'

const OPEN_WEATHER_BASE_ADDRESS = 'http://api.openweathermap.org'

const OPEN_WEATHER_GEO_VERSION = '1.0'
const OPEN_WEATHER_GEO_ADDRESS = `${OPEN_WEATHER_BASE_ADDRESS}/geo/${OPEN_WEATHER_GEO_VERSION}/direct`

const OPEN_WEATHER_FORCAST_VERSION = '2.5'
const OPEN_WEATHER_FORCAST_ADDRESS = `${OPEN_WEATHER_BASE_ADDRESS}/data/${OPEN_WEATHER_FORCAST_VERSION}/forecast`

export const fetchLocation: (locationName: string) => Promise<OpenWeatherLocation | null> = async (locationName) => {
  try {
    const response = await axios.get(OPEN_WEATHER_GEO_ADDRESS, {
      params: {
        q: locationName,
        limit: 1,
        appid: process.env.OPEN_WEATHER_APP_ID
      }
    })

    if (response.data == null) {
      throw new Error(`Location ${locationName} could not be found using OpenWeather API`)
    }

    const { name, lat, lon } = response.data[0]
    return { name, lat, lon }
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchForcast: (latitude: number, longitude: number) => Promise<OpenWeatherForcast[]> = async (latitude, longitude) => {
  try {
    const response = await axios.get(OPEN_WEATHER_FORCAST_ADDRESS, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.OPEN_WEATHER_APP_ID,
        units: process.env.FORCAST_UNITS ?? 'standard'
      }
    })

    return response.data.list.map(toOpenWeatherForcast)
  } catch (error) {
    console.error(error)
  }
}

const toOpenWeatherForcast: (forcastPoint: any) => OpenWeatherForcast = forcastPoint => (
  {
    datetime: new Date(forcastPoint.dt_txt),
    temp: forcastPoint.main.temp,
    feels_like: forcastPoint.main.feels_like,
    humidity: forcastPoint.main.humidity
  }
)
