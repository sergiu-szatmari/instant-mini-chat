import { Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler =
  async (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.render('error', err);
  }

export const notFoundHandler: RequestHandler =
  async (req: Request, res: Response, next: NextFunction) => {
    return res.render('error', { message: 'Page not found' });
  }

