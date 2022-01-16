import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('List companies', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });
  it('should be able to list categories', async () => {
    const category = await categoriesRepositoryInMemory.create({
      name: 'Category',
      description: 'Category description',
    });

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toEqual([category]);
  });
});
