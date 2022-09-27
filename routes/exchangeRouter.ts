import { Router } from 'express';

import ExchangeController from '../controllers/ExchangeController';
import { params, query } from '../middlewares/checkSchemaMiddleware';
import localhostMiddleware from '../middlewares/localhostMiddleware';
import {
  getByPeriodSimpleSchema, getByPeriodAdvancedSchema, symbolsQuerySchema,
} from '../schema/exchangeSchema';

const router = Router();

router.post('/update_rates', localhostMiddleware, ExchangeController.updateRates);

router.get(
  '/date/:date',
  params(getByPeriodSimpleSchema),
  query(symbolsQuerySchema),
  ExchangeController.getByDate,
);

router.get(
  '/period/simple/:date',
  params(getByPeriodSimpleSchema),
  query(symbolsQuerySchema),
  ExchangeController.getByPeriodSimple,
);

router.get(
  '/period/advanced',
  query(getByPeriodAdvancedSchema),
  ExchangeController.getByPeriodAdvanced,
);

router.get('/last', query(symbolsQuerySchema), ExchangeController.getLast);

export default router;
