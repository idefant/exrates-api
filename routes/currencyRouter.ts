import { Router } from 'express';

import CurrencyController from '../controllers/CurrencyController';

const router = Router();

router.get('/currencies', CurrencyController.getAll);

export default router;
