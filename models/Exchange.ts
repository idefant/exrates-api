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
 *  schemas:
 *    Rates:
 *      type: object
 *      additionalProperties:
 *        type: integer
 *      example:
 *        EUR: 1.1
 *        RUB: 0.011
 *        USD: 1
 */
