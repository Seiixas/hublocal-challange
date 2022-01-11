import { getRepository, Repository } from 'typeorm';

import { ICreateCompanyDTO } from '../../../dtos/ICreateCompanyDTO';
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository';
import { Company } from '../entities/Company';

class CompaniesRepository implements ICompaniesRepository {
  repository: Repository<Company>;

  constructor() {
    this.repository = getRepository(Company);
  }

  async create({
    name,
    description,
    cnpj,
    latitude,
    longitude,
    created_by,
    updated_by,
  }: ICreateCompanyDTO): Promise<void> {
    const company = this.repository.create({
      name,
      description,
      cnpj,
      latitude,
      longitude,
      created_by,
      updated_by,
    });

    await this.repository.save(company);
  }
  async all(): Promise<Company[]> {
    const companies = await this.repository.find();

    return companies;
  }
  async findByCnpj(cnpj: string): Promise<Company> {
    const company = await this.repository.findOne({ cnpj });

    return company;
  }
}

export { CompaniesRepository };
