import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { clearAuthenticatedSession } from '@utils/auth.util';

// Helper function to sanitize log input by removing CR and LF characters
function sanitizeLogInput(input: string): string {
  return input.replace(/[\r\n]/g, '');
}

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = status === 401 ? 'NOT_AUTHORIZED' : error.message || 'Something went wrong';
    const errors: string =
      error.errors?.length > 0 ? JSON.stringify(error.errors.map(error => ({ property: error.property, constraints: error.constraints }))) : '';

    // Sanitize user-controlled input before logging
    const safeMethod = sanitizeLogInput(String(req.method));
    const safePath = sanitizeLogInput(String(req.path));
    const safeMessage = sanitizeLogInput(String(message));
    const safeErrors = sanitizeLogInput(String(errors));

    console.error(`[${safeMethod}] ${safePath} >> StatusCode:: ${status}, Message:: ${safeMessage}, Errors:: ${safeErrors}`);
    logger.error(`[${safeMethod}] ${safePath} >> StatusCode:: ${status}, Message:: ${safeMessage}, Errors:: ${safeErrors}`);

    if (status === 401 && (req.session?.user || req.session?.authToken)) {
      clearAuthenticatedSession(req, res, clearSessionError => {
        if (clearSessionError) {
          logger.error('Failed to clear authenticated session after 401:', clearSessionError);
        }
        res.status(401).json({ message: 'NOT_AUTHORIZED' });
      });
      return;
    }

    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
