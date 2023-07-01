// I know that one of the major advantages having ORM is using its query builder
// Since those queries are more complex and I didn't want it to take more time then it took
// I decided to use the raw queries

export const avgTmpPerCityPerDayQuery = `
  SELECT l.id as "locationId", l.name as "locationName", f.datetime::timestamp::date as "date", AVG(f.temp) as "averageTemp"
  FROM forcast f
  JOIN location l ON f."locationId" = l.id
  GROUP BY l.id, l.name, f.datetime::timestamp::date
  ORDER BY l.id, l.name, f.datetime::timestamp::date
`

// Since we have index on the humidity column and we are limiting to 1 result,
// it should run faster then using subquery to find the minimum humidity and then to find the actual row
export const lowestHumidQuery = `
  SELECT l.id as "locationId", l.name as "locationName", f.datetime as "datetime", f.humidity as "humidity"
  FROM forcast f
  JOIN location l ON "locationId" = l.id
  ORDER BY f.humidity asc
  LIMIT 1
`

export const feelsLikeRankQuery = `
  SELECT l.id as "locationId", l.name as "locationName", f.datetime as "datetime", f.feels_like as "feelsLike"
  FROM forcast f
  JOIN location l ON "locationId" = l.id
  JOIN (
	  SELECT "locationId", MAX(datetime) as most_recent
	  FROM forcast
	  WHERE (datetime < now())
	  GROUP BY "locationId"
  ) as recent_times ON f."locationId" = recent_times."locationId" AND f.datetime = recent_times.most_recent 
  ORDER BY f.feels_like asc
`
