import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCompaniesCloselyToUserUseCase } from './ListCompaniesCloselyToUserUseCase';

class ListCompaniesCloselyToUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listCompaniesCloselyToUserUseCase = container.resolve(
      ListCompaniesCloselyToUserUseCase
    );

    const address = await listCompaniesCloselyToUserUseCase.execute(id);

    return response.json(address);
  }
}

export { ListCompaniesCloselyToUserController };
