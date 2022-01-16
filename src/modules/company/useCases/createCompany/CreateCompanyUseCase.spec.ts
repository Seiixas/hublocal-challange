import { AppError } from '../../../../shared/errors';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CompaniesRepositoryInMemory } from '../../repositories/in-memory/CompaniesRepositoryInMemory';
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';

let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let createCompanyUseCase: CreateCompanyUseCase;

describe('Create company', () => {
  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );

    createCompanyUseCase = new CreateCompanyUseCase(
      companiesRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });
  it('should be able to create a new company', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Category',
      description: 'My new category',
    });

    const company = await createCompanyUseCase.execute({
      name: 'Company',
      description: 'My new company',
      cnpj: 'CNPJ-NUMBER',
      latitude: -0.15,
      longitude: -0.15,
      created_by: 'uuid',
      category_id: category.id,
    });

    expect(company).toHaveProperty('id');
  });

  it('should not be able to create a company if CNPJ already exists', () => {
    expect(async () => {
      const category = await createCategoryUseCase.execute({
        name: 'Category',
        description: 'My new category',
      });

      await createCompanyUseCase.execute({
        name: 'Company',
        description: 'My new company',
        cnpj: 'CNPJ-NUMBER',
        latitude: -0.15,
        longitude: -0.15,
        created_by: 'uuid',
        category_id: category.id,
      });

      await createCompanyUseCase.execute({
        name: 'Company Two',
        description: 'My other company',
        cnpj: 'CNPJ-NUMBER',
        latitude: -0.15,
        longitude: -0.15,
        created_by: 'uuid',
        category_id: category.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create with an unexistent category', () => {
    expect(async () => {
      await createCompanyUseCase.execute({
        name: 'Company',
        description: 'My new company',
        cnpj: 'CNPJ-NUMBER',
        latitude: -0.15,
        longitude: -0.15,
        created_by: 'uuid',
        category_id: 'wrong_category_uuid',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
