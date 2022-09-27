/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const port = process.env.PORT;
const app = express();

const startApp = async () => {
  try {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

startApp();
