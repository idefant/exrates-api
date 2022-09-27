import axios from 'axios';

const oxr = axios.create({ baseURL: 'https://openexchangerates.org/api/' });

export const getCurrenciesRequest = () => oxr('/currencies.json');

export const getActualRatesRequest = () => (
  oxr.get('/latest.json', {
    params: {
      app_id: process.env.OXR_APP_ID,
      symbols: process.env.OXR_SYMBOLS,
    },
  })
);
