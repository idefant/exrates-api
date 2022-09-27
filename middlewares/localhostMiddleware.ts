import { NextFunction, Response, Request } from 'express';

import HttpException from '../models/HttpException';

const localhostMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.ip)) {
    next(new HttpException(403, 'Access denied'));
    return;
  }
  next();
};

export default localhostMiddleware;
