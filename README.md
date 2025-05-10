# ExRates

[![DockerHub](https://img.shields.io/badge/DockerHub-%23363636?logo=docker)](https://hub.docker.com/repository/docker/idefant/exrates-api)
[![API Docs](https://img.shields.io/badge/API_Docs-%23363636?logo=swagger)](https://exrates.idefant.ru/docs/)

A simple Exchange Rates API

Data is collected once a day from [Open Exchange Rates](https://openexchangerates.org/)

## Features

- Getting up-to-date data
- Getting rates by date
- Getting rates by period (2 routes)
- Filtering by currency code

## Production

1. Create `docker-compose.yml` with content:
```yml
services:
  exrates-api:
    image: idefant/exrates-api
    container_name: exrates
    env_file:
      - .env
    restart: unless-stopped
    ports:
      - "3000:3000"

  mongo:
    image: mongo
    restart: always
    env_file:
      - .env
   environment:
     MONGO_INITDB_ROOT_USERNAME: ${DB_USER}
     MONGO_INITDB_ROOT_PASSWORD: ${DB_PASSWORD}
     MONGO_INITDB_DATABASE: ${DB_NAME}
    volumes:
      - ./db:/data/db
```
2. Create `.env` and fill in similarly `.env.sample`
3. Run `docker compose up -d`
4. Open [link](https://localhost:3000/docs/) in your browser

## Development

To begin development:

1. Clone this repo
2. Create `.env` and fill in similarly `.env.sample`
3. Install dependencies with `npm install`

```sh
# Run in development mode
npm run dev

# Build app
npm run build
```

Please [Star](#) this repo by clicking on [⭐ button](#)
