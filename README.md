# ExRates

A simple Exchange Rates API

Data is collected once a day from [Open Exchange Rates](https://openexchangerates.org/)

## Features

- Getting up-to-date data
- Getting rates by date
- Getting rates by period (2 routes)
- Filtering by currency code

## Routes

### Formats

- `{date}` - Date in format `YYYY-MM-DD`
- `{period}` - Date in format `YYYY-MM-DD` or `YYYY-MM` or `YYYY`
- `{symbols}` - Сomma-separated list of currencies (Example: usd,eur,cny)

### Endpoints

- `/currencies`
> Description: Get list of available currencies<br>
> Method: GET

- `/date/{date}`
> Description: Get exchange rate for a specific date<br>
> Method: GET<br>
> Optional params: symbols={symbols}

- `/date/last`
> Description: Get exchange rate for a last day<br>
> Method: GET<br>
> Optional params: symbols={symbols}

- `/period/simple/{period}`
> Description: Get list of rates for a certain period<br>
> Method: GET<br>
> Optional params: symbols={symbols}

- `/period/advanced`
> Description: Get list of rates for a certain period<br>
> Method: GET<br>
> Required params: from={period}, to={period}<br>
> Optional params: symbols={symbols}

- `/update_rates`
> Description: Update exchange rates (only localhost)<br>
> Method: POST

### Examples

- <http://localhost:3000/currencies>
- <http://localhost:3000/date/2022-08-30>
- <http://localhost:3000/last?symbols=eur,usd>
- <http://localhost:3000/period/simple/2022-08?symbols=eur,usd>
- <http://localhost:3000/period/advanced?from=2022-08&to=2022-09>

## Production

1. Create `docker-compose.yml` with content:
```yml
version: "3.8"

services:
  exrates-api:
    image: idefant/exrates-api
    container_name: exrates-api
    env_file:
      - .env
    restart: unless-stopped
    ports:
      - "8182:3000"
```
2. Create `.env` and fill in similarly `.env.sample`
3. Run `docker compose up -d`

## Development

To begin development:

1. Clone this repo
2. Create `.env` and fill in similarly `.env.sample`
3. `npm i`
4. `npm run build`
5. `npm run dev`

Please [Star](#) this repo by clicking on [⭐ button](#)
