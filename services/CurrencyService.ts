import { AxiosResponse } from 'axios';

import { getCurrenciesRequest } from '../requests/oxrRequests';

class CurrencyService {
  currencies: Record<string, string> = {};

  async fetch() {
    await getCurrenciesRequest()
      .then((oxrRes: AxiosResponse<Record<string, string>>) => {
        const oxrSymbols = new Set(process.env.OXR_SYMBOLS?.toUpperCase().split(','));

        if (!oxrSymbols.size) {
          this.currencies = oxrRes.data;
          return;
        }

        const currencies: Record<string, string> = {};
        Object.entries(oxrRes.data).forEach(([key, value]) => {
          if (oxrSymbols.has(key)) {
            currencies[key] = value;
          }
        });
        this.currencies = currencies;
      });
  }
}

export default new CurrencyService();
