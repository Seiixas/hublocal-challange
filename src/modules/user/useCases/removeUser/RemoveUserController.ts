import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveUserUseCase } from './RemoveUserUseCase';

class RemoveUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { password } = request.body;

    const removeUserUseCase = container.resolve(RemoveUserUseCase);

    await removeUserUseCase.execute({
      user_id: id,
      password,
    });

    return response.send();
  }
}

export { RemoveUserController };
