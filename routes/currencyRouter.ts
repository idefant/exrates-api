import { Router } from 'express';

import CurrencyController from '../controllers/CurrencyController';

const router = Router();

/**
 * @openapi
 * /currencies:
 *   get:
 *     tags:
 *       - Currency
 *     summary: List of currencies
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: string
 *               example:
 *                 EUR: Euro
 *                 RUB: Russian Ruble
 *                 USD: United States Dollar
 */
router.get('/currencies', CurrencyController.getAll);

export default router;
