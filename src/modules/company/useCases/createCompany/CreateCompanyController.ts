import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompanyUseCase } from './CreateCompanyUseCase';

class CreateCompanyController {
  async handle(request: Request, response: Response) {
    const { name, description, cnpj, latitude, longitude, created_by } =
      request.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    await createCompanyUseCase.execute({
      name,
      description,
      cnpj,
      latitude,
      longitude,
      created_by,
    });

    return response.status(201).send();
  }
}

export { CreateCompanyController };
