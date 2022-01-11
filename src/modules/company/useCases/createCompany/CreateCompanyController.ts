import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompanyUseCase } from './CreateCompanyUseCase';

class CreateCompanyController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const { name, description, cnpj, latitude, longitude } = request.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    await createCompanyUseCase.execute({
      name,
      description,
      cnpj,
      latitude,
      longitude,
      created_by: id,
    });

    return response.status(201).send();
  }
}

export { CreateCompanyController };
