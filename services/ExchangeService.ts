import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import Exchange from '../models/Exchange';
import HttpException from '../models/HttpException';
import { getActualRatesRequest } from '../requests/oxrRequests';
import { prepareExchange } from '../utils/exchangeUtils';
import { filterRates } from '../utils/rateUtils';
import { parseSymbolsQuery } from '../utils/symbolUtils';

class ExchangeService {
  static async getByDate(date: string, symbolsFormatted: any) {
    const symbols = parseSymbolsQuery(symbolsFormatted);
    const exchange = await Exchange.findById(date);
    return exchange ? filterRates(exchange.rates, symbols) : {};
  }

  static async getByPeriodSimple(date: string, symbolsFormatted: any) {
    const symbols = parseSymbolsQuery(symbolsFormatted);
    const exchanges = await Exchange.find({ _id: new RegExp(`^${date}`) });
    return prepareExchange(exchanges, symbols);
  }

  static async getByPeriodAdvanced(from: any, to: any, symbolsFormatted: any) {
    const symbols = parseSymbolsQuery(symbolsFormatted);
    const exchanges = await Exchange.find({ _id: { $gte: from, $lte: to } });
    return prepareExchange(exchanges, symbols);
  }

  static async getLast(symbolsFormatted: any) {
    const symbols = parseSymbolsQuery(symbolsFormatted);
    const [exchange] = await Exchange.find().sort({ _id: -1 }).limit(1);
    if (!exchange) {
      return null;
    }

    return {
      date: exchange._id,
      rates: filterRates(exchange.rates, symbols),
    };
  }

  static async fetchCurrentRates(): Promise<{ status: number; json?: any }> {
    const todayStr = dayjs().utc().format('YYYY-MM-DD');
    if (await Exchange.exists({ _id: todayStr })) {
      throw new HttpException(400, 'Data already exist');
    }

    type OxrResponse = {
      timestamp: number;
      base: string;
      rates: Record<string, number>;
    };

    try {
      const res: AxiosResponse<OxrResponse> = await getActualRatesRequest();

      const mainCurrencySymbol = process.env.OXR_MAIN_CURRENCY || 'USD';
      const rates = Object.entries(res.data.rates).reduce(
        (acc: Record<string, number>, [key, value]) => {
          acc[key] = value / res.data.rates[mainCurrencySymbol];
          return acc;
        },
        {},
      );

      await Exchange.create({ _id: todayStr, rates });
      return { status: 200 };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(dayjs().utc().format('YYYY-MM-DD HH:mm'), 'OXR Request Error', error);
      return { status: 500, json: { message: 'OXR Request Error', error } };
    }
  }
}

export default ExchangeService;
