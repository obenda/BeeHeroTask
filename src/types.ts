export interface OpenWeatherLocation {
  name: string
  lat: number
  lon: number
}

export interface OpenWeatherForcast {
  datetime: Date
  temp: number
  feels_like: number
  humidity: number
}
