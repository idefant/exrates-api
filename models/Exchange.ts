import mongoose from 'mongoose';

export type TExchange = {
  _id: string;
  rates: Record<string, number>;
};

const Exchange = new mongoose.Schema<TExchange>({
  _id: { type: String, required: true },
  rates: { type: {}, required: true },
});

export default mongoose.model('Exchange', Exchange);

/**
 * @openapi
 * components:
 *   schemas:
 *     Rates:
 *       type: object
 *       additionalProperties:
 *         type: integer
 *       example:
 *         EUR: 1.1
 *         RUB: 0.011
 *         USD: 1
 *
 *     DateRates:
 *       type: object
 *       additionalProperties:
 *         $ref: '#/components/schemas/Rates'
 *       example:
 *         2024-02-12:
 *           EUR: 1.1
 *           RUB: 0.011
 *           USD: 1
 *         2024-02-13:
 *           EUR: 1.1
 *           RUB: 0.011
 *           USD: 1
 *         2024-02-14:
 *           EUR: 1.1
 *           RUB: 0.011
 *           USD: 1
 *
 *     LastDateRates:
 *       type: object
 *       required:
 *         - date
 *         - rates
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         rates:
 *           $ref: '#/components/schemas/Rates'
 */
