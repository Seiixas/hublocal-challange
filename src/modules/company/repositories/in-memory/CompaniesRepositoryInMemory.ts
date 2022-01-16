import { ICreateCompanyDTO } from '../../dtos/ICreateCompanyDTO';
import { ISetCompanyApprovedDTO } from '../../dtos/ISetCompanyApprovedDTO';
import { Company } from '../../infra/typeorm/entities/Company';
import { ICompaniesRepository } from '../ICompaniesRepository';

class CompaniesRepositoryInMemory implements ICompaniesRepository {
  companies: Company[] = [];

  async create({
    name,
    description,
    cnpj,
    latitude,
    longitude,
    created_by,
    updated_by,
    category_id,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = new Company();

    Object.assign(company, {
      name,
      description,
      cnpj,
      latitude,
      longitude,
      created_by,
      updated_by,
      category_id,
    });

    this.companies.push(company);

    return company;
  }

  async remove(id: string): Promise<void> {
    const companyIndex = this.companies.findIndex(
      (company) => company.id === id
    );

    this.companies.splice(companyIndex, 1);
  }

  async all(): Promise<Company[]> {
    const approvedCompanies = this.companies.filter(
      (company) => company.approved === true
    );

    return approvedCompanies;
  }

  async findByCnpj(cnpj: string): Promise<Company> {
    const company = this.companies.find((company) => company.cnpj === cnpj);

    return company;
  }

  async findById(id: string): Promise<Company> {
    const company = this.companies.find((company) => company.id === id);

    return company;
  }

  async allUnapproved(): Promise<Company[]> {
    const approvedCompanies = this.companies.filter(
      (company) => company.approved === false
    );

    return approvedCompanies;
  }

  async setCompanyApproved({
    admin_id,
    id,
  }: ISetCompanyApprovedDTO): Promise<void> {
    const company = this.companies.findIndex((company) => company.id === id);

    this.companies[company].approved = true;
    this.companies[company].updated_by = admin_id;
  }
}

export { CompaniesRepositoryInMemory };
