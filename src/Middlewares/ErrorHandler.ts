import { NextFunction, Request, Response } from 'express';
import HttpErrors from './HttpErrors';

class ErrorHandler {
  public static handle(
    error: HttpErrors,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(error.status).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;