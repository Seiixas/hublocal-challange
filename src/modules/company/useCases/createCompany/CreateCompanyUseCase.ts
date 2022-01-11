import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

interface IRequest {
  name: string;
  description: string;
  cnpj: string;
  latitude: number;
  longitude: number;
  created_by: string;
}

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({
    name,
    description,
    cnpj,
    latitude,
    longitude,
    created_by,
  }: IRequest) {
    const company = await this.companiesRepository.findByCnpj(cnpj);

    if (company) {
      throw new AppError('This company already exists');
    }

    const updated_by = created_by;

    await this.companiesRepository.create({
      name,
      description,
      cnpj,
      latitude,
      longitude,
      created_by,
      updated_by,
    });
  }
}

export { CreateCompanyUseCase };
