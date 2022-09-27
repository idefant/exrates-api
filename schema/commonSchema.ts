import { string } from 'yup';

export const symbolsSchema = string().matches(/^[a-z]+(,[a-z]+)*$/i);
export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const periodRegex = /^\d{4}(-\d{2}(-\d{2})?)?$/;
