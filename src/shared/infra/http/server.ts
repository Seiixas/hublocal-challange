import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';

import '../typeorm';
import '../../container';

import { AppError } from '../../errors';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ): Response => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log('🚀 Server is now running!'));
