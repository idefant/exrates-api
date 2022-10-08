/* eslint-disable no-console */
import cors from 'cors';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import schedule from 'node-schedule';

import errorMiddleware from './middlewares/errorMiddleware';
import currencyRouter from './routes/currencyRouter';
import exchangeRouter from './routes/exchangeRouter';
import CurrencyService from './services/CurrencyService';
import ExchangeService from './services/ExchangeService';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use('/', exchangeRouter);
app.use('/', currencyRouter);

app.use(errorMiddleware);

const startApp = async () => {
  try {
    const dbUrl = process.env.MONGO_CONNECT_URI;
    if (!dbUrl) {
      throw new Error('MONGO_CONNECT_URI is empty');
    }

    await mongoose.connect(dbUrl);
    await CurrencyService.fetch();

    app.listen(port, () => console.log(`Server started on port ${port}`));
    const cronRule = process.env.CRON_RULE || '5 * * * *';
    schedule.scheduleJob(cronRule, ExchangeService.fetchCurrentRates);
  } catch (e) {
    console.log(e);
  }
};

startApp();
