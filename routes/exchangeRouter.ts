import { Router } from 'express';

import ExchangeController from '../controllers/ExchangeController';
import { params, query } from '../middlewares/checkSchemaMiddleware';
import localhostMiddleware from '../middlewares/localhostMiddleware';
import {
  getByPeriodSimpleSchema, getByPeriodAdvancedSchema, symbolsQuerySchema,
} from '../schema/exchangeSchema';

const router = Router();

/**
 * @openapi
 * /update_rates:
 *   post:
 *     tags:
 *       - Exchange Rate
 *     summary: Update exchange rate
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpException'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpException'
 */
router.post('/update_rates', localhostMiddleware, ExchangeController.updateRates);

/**
 * @openapi
 * /date/{date}:
 *   get:
 *     tags:
 *       - Exchange Rate
 *     summary: Exchange rate by date
 *     parameters:
 *      - name: date
 *        in: path
 *        required: true
 *        format: date
 *        example: 2024-02-14
 *      - name: symbols
 *        in: query
 *        example: usd,eur,cny
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rates'
 */
router.get(
  '/date/:date',
  params(getByPeriodSimpleSchema),
  query(symbolsQuerySchema),
  ExchangeController.getByDate,
);

/**
 * @openapi
 * /period/simple/{period}:
 *   get:
 *     tags:
 *       - Exchange Rate
 *     summary: Exchange rate by period (simple)
 *     parameters:
 *      - name: period
 *        in: path
 *        required: true
 *        example: 2024-02
 *      - name: symbols
 *        in: query
 *        example: usd,eur,cny
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - date
 *                   - rates
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                   rates:
 *                     $ref: '#/components/schemas/Rates'
 */
router.get(
  '/period/simple/:date',
  params(getByPeriodSimpleSchema),
  query(symbolsQuerySchema),
  ExchangeController.getByPeriodSimple,
);

/**
 * @openapi
 * /period/advanced:
 *   get:
 *     tags:
 *       - Exchange Rate
 *     summary: Exchange rate by period (advanced)
 *     parameters:
 *      - name: from
 *        in: query
 *        required: true
 *        example: 2024-01
 *      - name: to
 *        in: query
 *        required: true
 *        example: 2024-02-14
 *      - name: symbols
 *        in: query
 *        example: usd,eur
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - date
 *                   - rates
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                   rates:
 *                     $ref: '#/components/schemas/Rates'
 */
router.get(
  '/period/advanced',
  query(getByPeriodAdvancedSchema),
  ExchangeController.getByPeriodAdvanced,
);

/**
 * @openapi
 * /last:
 *   get:
 *     tags:
 *       - Exchange Rate
 *     summary: Current exchange rate
 *     parameters:
 *      - name: symbols
 *        in: query
 *        example: usd,eur,cny
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - date
 *                 - rates
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date
 *                 rates:
 *                   $ref: '#/components/schemas/Rates'
 */
router.get('/last', query(symbolsQuerySchema), ExchangeController.getLast);

export default router;
