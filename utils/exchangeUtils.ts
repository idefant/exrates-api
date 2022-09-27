import { TExchange } from '../models/Exchange';

import { filterRates } from './rateUtils';

export const prepareExchange = (exchanges: TExchange[], symbols?: Set<string>) => (
  exchanges.reduce((acc: Record<string, Record<string, number>>, exchange) => {
    acc[exchange._id] = filterRates(exchange.rates, symbols);
    return acc;
  }, {})
);
