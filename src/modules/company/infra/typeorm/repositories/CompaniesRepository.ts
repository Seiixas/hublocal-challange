import { getRepository, Repository } from 'typeorm';

import { ICreateCompanyDTO } from '../../../dtos/ICreateCompanyDTO';
import { ISetCompanyApprovedDTO } from '../../../dtos/ISetCompanyApprovedDTO';
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
    const companies = await this.repository.find({
      approved: true,
    });

    return companies;
  }

  async findByCnpj(cnpj: string): Promise<Company> {
    const company = await this.repository.findOne({ cnpj });

    return company;
  }

  async allUnapproved(): Promise<Company[]> {
    const companiesNotApproved = await this.repository.find({
      approved: false,
    });

    return companiesNotApproved;
  }

  async findById(id: string): Promise<Company> {
    const company = await this.repository.findOne(id);

    return company;
  }

  async setCompanyApproved({
    id,
    admin_id,
  }: ISetCompanyApprovedDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Company)
      .set({
        approved: true,
        updated_at: new Date(),
        updated_by: admin_id,
      })
      .where(' id = :id', { id })
      .execute();
  }
}

export { CompaniesRepository };
