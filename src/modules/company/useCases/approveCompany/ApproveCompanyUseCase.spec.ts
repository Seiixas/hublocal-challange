import { AppError } from '../../../../shared/errors';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CompaniesRepositoryInMemory } from '../../repositories/in-memory/CompaniesRepositoryInMemory';
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { CreateCompanyUseCase } from '../createCompany/CreateCompanyUseCase';
import { ApproveCompanyUseCase } from './ApproveCompanyUseCase';

let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let approveCompanyUseCase: ApproveCompanyUseCase;
let createCompanyUseCase: CreateCompanyUseCase;

describe('Approve company', () => {
  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    approveCompanyUseCase = new ApproveCompanyUseCase(
      companiesRepositoryInMemory
    );
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
    createCompanyUseCase = new CreateCompanyUseCase(
      companiesRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });

  it('should be able to approve a new company', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'My category',
      description: 'This is my new category',
    });

    const company = await createCompanyUseCase.execute({
      name: 'My new company',
      description: 'This is an new company',
      cnpj: '14.214.419/0001-50',
      latitude: -0.15,
      longitude: -0.15,
      created_by: 'uuid',
      category_id: category.id,
    });

    await approveCompanyUseCase.execute({
      company_id: company.id,
      admin_id: 'admin_id',
    });

    expect(company.approved).toEqual(true);
  });

  it('should not be able to approve an company already approved', () => {
    expect(async () => {
      const category = await createCategoryUseCase.execute({
        name: 'My category',
        description: 'This is my new category',
      });

      const company = await createCompanyUseCase.execute({
        name: 'My new company',
        description: 'This is an new company',
        cnpj: '14.214.419/0001-50',
        latitude: -0.15,
        longitude: -0.15,
        created_by: 'uuid',
        category_id: category.id,
      });

      await approveCompanyUseCase.execute({
        company_id: company.id,
        admin_id: 'admin_id',
      });

      await approveCompanyUseCase.execute({
        company_id: company.id,
        admin_id: 'admin_id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
