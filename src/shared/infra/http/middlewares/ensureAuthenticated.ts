import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../../../../modules/user/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError('Token is missing!', 401);
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '730daedd0e1ee8bd73e09bccf201e774'
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = { id: user_id };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
