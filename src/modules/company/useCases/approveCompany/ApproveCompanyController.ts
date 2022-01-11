import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ApproveCompanyUseCase } from './ApproveCompanyUseCase';

class ApproveCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { company_id } = request.params;

    const approveCompanyUseCase = container.resolve(ApproveCompanyUseCase);

    await approveCompanyUseCase.execute({
      company_id,
      admin_id: id,
    });

    return response.status(201).send();
  }
}

export { ApproveCompanyController };
