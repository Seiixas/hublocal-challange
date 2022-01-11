import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveCompanyUseCase } from './RemoveCompanyUseCase';

class RemoveCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { password } = request.body;
    const { company_id } = request.params;

    const removeCompanyUseCase = container.resolve(RemoveCompanyUseCase);

    await removeCompanyUseCase.execute({
      id: company_id,
      user_id: id,
      password,
    });

    return response.send();
  }
}

export { RemoveCompanyController };
