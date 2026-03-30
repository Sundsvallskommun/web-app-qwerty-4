import { NODE_ENV } from '@/config';
import { HttpException } from '@exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.isAuthenticated()) {
      next();
      return;
    }

    if (NODE_ENV !== 'development' && req.session.user && req.session.authToken) {
      req.user = req.session.user;
      next();
      return;
    }

    next(new HttpException(401, 'NOT_AUTHORIZED'));
  } catch (error) {
    next(new HttpException(401, 'AUTH_FAILED'));
  }
};

export default authMiddleware;
