import { Request, Response } from 'express';

import CurrencyService from '../services/CurrencyService';

class CurrencyController {
  static getAll(_req: Request, res: Response) {
    res.send(CurrencyService.currencies);
  }
}

export default CurrencyController;
