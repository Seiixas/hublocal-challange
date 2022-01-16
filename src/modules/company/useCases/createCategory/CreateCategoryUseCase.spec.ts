import { AppError } from '../../../../shared/errors';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create company', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it('should be able to create a new company', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Category',
      description: 'My category description',
    });

    expect(category).toHaveProperty('id');
  });
  it('should not be able to create an existent category', async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: 'Category',
        description: 'My category description',
      });

      await createCategoryUseCase.execute({
        name: 'Category',
        description: 'My category description',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
