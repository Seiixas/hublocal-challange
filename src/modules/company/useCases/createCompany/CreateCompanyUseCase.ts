import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors';
import { Company } from '../../infra/typeorm/entities/Company';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

interface IRequest {
  name: string;
  description: string;
  cnpj: string;
  latitude: number;
  longitude: number;
  created_by: string;
  category_id: string;
}

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    name,
    description,
    cnpj,
    latitude,
    longitude,
    created_by,
    category_id,
  }: IRequest): Promise<Company> {
    const companyAlreadyExists = await this.companiesRepository.findByCnpj(
      cnpj
    );

    if (companyAlreadyExists) {
      throw new AppError('This company already exists');
    }

    const categoryExists = await this.categoriesRepository.findById(
      category_id
    );

    if (!categoryExists) {
      throw new AppError('This category does not exists');
    }

    const updated_by = created_by;

    const company = await this.companiesRepository.create({
      name,
      description,
      cnpj,
      latitude,
      longitude,
      created_by,
      updated_by,
      category_id,
    });

    return company;
  }
}

export { CreateCompanyUseCase };
