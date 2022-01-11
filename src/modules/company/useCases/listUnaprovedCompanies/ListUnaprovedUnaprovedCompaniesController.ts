import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUnapprovedCompaniesUseCase } from './ListUnapprovedCompaniesUseCase';

class ListUnapprovedCompaniesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUnapprovedCompaniesUseCase = container.resolve(
      ListUnapprovedCompaniesUseCase
    );

    const companies = await listUnapprovedCompaniesUseCase.execute();

    return response.json(companies);
  }
}

export { ListUnapprovedCompaniesController };
