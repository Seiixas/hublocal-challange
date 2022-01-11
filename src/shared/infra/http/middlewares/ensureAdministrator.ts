import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '../../../../modules/user/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors';

export async function ensureAdministrator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user) {
    throw new AppError('This user does not exists!', 404);
  }

  if (!user.admin) {
    throw new AppError('You are not an admin user!', 401);
  }

  next();
}
