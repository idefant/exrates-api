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
