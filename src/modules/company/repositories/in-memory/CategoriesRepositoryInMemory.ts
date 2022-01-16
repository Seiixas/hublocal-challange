import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async remove(id: string): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );

    this.categories.splice(categoryIndex, 1);
  }

  async all(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);

    return category;
  }
}

export { CategoriesRepositoryInMemory };
