import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

interface IRequest {
  company_id: string;
  admin_id: string;
}

@injectable()
class ApproveCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({ company_id, admin_id }: IRequest) {
    const company = await this.companiesRepository.findById(company_id);

    if (company.approved) {
      throw new AppError('This company is already approved');
    }

    await this.companiesRepository.setCompanyApproved({
      id: company_id,
      admin_id,
    });
  }
}

export { ApproveCompanyUseCase };
