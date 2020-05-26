# DevCamper

> A MERN stack project application which is a bootcamp directory website.

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm run prod

# Run server only
npm run server

# Run client only
npm run client
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Use as an API

> API Documentation with examples [here](https://documenter.getpostman.com/view/10164493/SzS2yUhh?version=latest)
