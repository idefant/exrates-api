import { object, string } from 'yup';

import { dateRegex, periodRegex, symbolsSchema } from './commonSchema';

export const symbolsQuerySchema = object().shape({ symbols: symbolsSchema });

export const getByDateSchema = object().shape({
  date: string().required().matches(dateRegex),
});

export const getByPeriodSimpleSchema = object().shape({
  date: string().required().matches(periodRegex),
});

export const getByPeriodAdvancedSchema = object().shape({
  symbols: symbolsSchema,
  from: string().required().matches(periodRegex),
  to: string().required().matches(periodRegex),
});
