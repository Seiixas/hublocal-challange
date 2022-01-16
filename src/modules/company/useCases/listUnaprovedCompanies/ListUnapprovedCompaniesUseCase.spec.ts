import { CompaniesRepositoryInMemory } from '../../repositories/in-memory/CompaniesRepositoryInMemory';
import { ListUnapprovedCompaniesUseCase } from './ListUnapprovedCompaniesUseCase';

let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
let listUnapprovedCompaniesUseCase: ListUnapprovedCompaniesUseCase;

describe('List unapproved companies', () => {
  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    listUnapprovedCompaniesUseCase = new ListUnapprovedCompaniesUseCase(
      companiesRepositoryInMemory
    );
  });
  it('should be able to list unnaproved companies', async () => {
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

    const companies = await listUnapprovedCompaniesUseCase.execute();

    expect(companies).toEqual([company]);
  });
});
