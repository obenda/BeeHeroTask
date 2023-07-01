# BeeHero Task - Oz Ben-David

## So, what did I used?
- Created the project using TypeORM - We examined it in my previous work, it is great, we didn't incorporated it since it was really complicated to incorporate it in already existing big project, so it was nice to play with it a bit now
- TypeScript of course
- Used Postgres using docker image
- Used [Standard (ts)](https://standardjs.com/) for linting
- Express & Axios
- Used dotenv and put important information in the .env file
- Run and tested on Ubuntu 20.04 LTS (over Windows WSL2)

## Some other points
- I decided to use raw SQL queries to save time, as I wrote before, TypeORM is something I wanted to work with but didn't had the chance before and I didn't want to go deeper on learning how to use its query builder
- I didn't add tests, but of course unit tests are needed for each function and API testing for the end-points we defined
- In order to keep the data continuously updated, I would have used node-cron (or setInterval in that simple case) to execute every 3 hours and save only the forcasts points that are not already in the database


## .env file structure
```
OPEN_WEATHER_APP_ID=[the API key]
OPEN_WEATHER_NEEDED_LOCATIONS=[comma delimited locations names list]
POSTGRES_HOST=[the database host e.g. localhost]
POSTGRES_PASSWORD=[the database password]
POSTGRES_USER=[the database user]
POSTGRES_DB=[the database name]
FORCAST_UNITS=[standard, metric or imperial]
```

I will send you my .env file by email

## prerequisites and running the application
- Installing docker (https://docs.docker.com/engine/install/ubuntu/#prerequisites)
  - on ubuntu I also had to follow this twick https://github.com/docker/for-linux/issues/1406#issuecomment-1183487816 which make the docker to run
- running the docker and postgress
  - I didn't configured it to run as non-root user so `sudo` was needed
  - run `sudo service docker start`
  - run `sudo docker run --name local-postgres -e POSTGRES_PASSWORD=[the db password] -e POSTGRES_USER=postgres -e POSTGRES_DB=BeeHeroTask -d -p 5432:5432 postgres`
  - (run `sudo docker restart local-postgres` if you are turning it off\restart your laptop)
- Grab the code, in its root folder `npm install`
- in its root folder create `.env` file containing all the variables described above
- run `npm start` (uses nodemon for easy development, but can be removed later)

That's all

When the server is comming up, it first try to connect to the database and to fetch all the location and 3 days forcast information and saving those in the data base

Once it is up, it exposes the 3 endpoints as requested

## The API

### GET /avg_tmp_per_city_per_day
Returns average temp for each city for each day
The instructions were not fully clear about the structure so I decided on flat one so it be easier to the client in any way he would like to use the result

exmaple result:
```
[
    {
        "locationId": 89,
        "locationName": "Jerusalem",
        "date": "2023-06-30",
        "averageTemp": "19.4000000000000000"
    },
    {
        "locationId": 89,
        "locationName": "Jerusalem",
        "date": "2023-07-01",
        "averageTemp": "22.7137500000000000"
    },
    ...
]
```

### GET /lowest_humid
Returns the place and time of the lowest humidity point

exmaple result:
```
{
    "locationId": 83,
    "locationName": "Eilat",
    "datetime": "2023-07-03T09:00:00.000Z",
    "humidity": 12
}
```

### GET /feels_like_rank
Returns rank of the the cities by their last (most recent) “feels_like” value in ascending order.

exmaple result:
```
[
    {
        "locationId": 96,
        "locationName": "Jerusalem",
        "datetime": "2023-07-01T00:00:00.000Z",
        "feelsLike": "18.73"
    },
    {
        "locationId": 98,
        "locationName": "Tiberias",
        "datetime": "2023-07-01T00:00:00.000Z",
        "feelsLike": "23.55"
    },
    {
        "locationId": 97,
        "locationName": "Tel Aviv-Yafo",
        "datetime": "2023-07-01T00:00:00.000Z",
        "feelsLike": "23.91"
    },
    {
        "locationId": 95,
        "locationName": "Haifa",
        "datetime": "2023-07-01T00:00:00.000Z",
        "feelsLike": "24.71"
    },
    {
        "locationId": 94,
        "locationName": "Eilat",
        "datetime": "2023-07-01T00:00:00.000Z",
        "feelsLike": "26.61"
    }
]
```

Please contact me with any question - 0544584605

Thanks
