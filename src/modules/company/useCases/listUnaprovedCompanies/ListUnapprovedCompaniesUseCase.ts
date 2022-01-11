import { inject, injectable } from 'tsyringe';

import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

@injectable()
class ListUnapprovedCompaniesUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute() {
    const companies = await this.companiesRepository.allUnapproved();

    return companies;
  }
}

export { ListUnapprovedCompaniesUseCase };
