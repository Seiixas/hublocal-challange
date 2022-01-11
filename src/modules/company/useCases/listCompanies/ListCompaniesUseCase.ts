import { inject, injectable } from 'tsyringe';

import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

@injectable()
class ListCompaniesUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute() {
    const companies = await this.companiesRepository.all();

    return companies;
  }
}

export { ListCompaniesUseCase };
