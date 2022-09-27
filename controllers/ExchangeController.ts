import { NextFunction, Request, Response } from 'express';

import ExchangeService from '../services/ExchangeService';

class ExchangeController {
  static async updateRates(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExchangeService.fetchCurrentRates();
      res.status(result.status).send(result.json);
    } catch (e) {
      next(e);
    }
  }

  static async getByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExchangeService.getByDate(req.params.date, req.query.symbols);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }

  static async getByPeriodSimple(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExchangeService.getByPeriodSimple(req.params.date, req.query.symbols);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }

  static async getByPeriodAdvanced(req: Request, res: Response, next: NextFunction) {
    try {
      const { from, to, symbols } = req.query;
      const result = await ExchangeService.getByPeriodAdvanced(from, to, symbols);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }

  static async getLast(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExchangeService.getLast(req.query.symbols);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
}

export default ExchangeController;
