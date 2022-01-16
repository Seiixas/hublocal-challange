import { CompaniesRepositoryInMemory } from '../../repositories/in-memory/CompaniesRepositoryInMemory';
import { ApproveCompanyUseCase } from '../approveCompany/ApproveCompanyUseCase';
import { ListCompaniesUseCase } from './ListCompaniesUseCase';

let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
let approveCompanyUseCase: ApproveCompanyUseCase;
let listCompaniesUseCase: ListCompaniesUseCase;

describe('List companies', () => {
  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    listCompaniesUseCase = new ListCompaniesUseCase(
      companiesRepositoryInMemory
    );
    approveCompanyUseCase = new ApproveCompanyUseCase(
      companiesRepositoryInMemory
    );
  });
  it('should be able to list companies approved', async () => {
    const company = await companiesRepositoryInMemory.create({
      name: 'My company',
      description: 'My company description',
      cnpj: 'CNPJ-NUMBER',
      latitude: -0.15,
      longitude: -0.15,
      created_by: 'uuid',
      updated_by: 'uuid',
      category_id: 'uuid',
    });

    await approveCompanyUseCase.execute({
      company_id: company.id,
      admin_id: 'uuid',
    });

    const companies = await listCompaniesUseCase.execute();

    expect(companies).toEqual([company]);
  });
  it('should not be able to list unapproved companies', async () => {
    await companiesRepositoryInMemory.create({
      name: 'My company',
      description: 'My company description',
      cnpj: 'CNPJ-NUMBER',
      latitude: -0.15,
      longitude: -0.15,
      created_by: 'uuid',
      updated_by: 'uuid',
      category_id: 'uuid',
    });

    const companies = await listCompaniesUseCase.execute();

    expect(companies).toEqual([]);
  });
});
