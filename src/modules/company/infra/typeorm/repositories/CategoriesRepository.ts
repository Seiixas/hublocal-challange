import { getRepository, Repository } from 'typeorm';

import { ICreateCategoryDTO } from '../../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);

    return category;
  }

  async remove(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  async all(): Promise<Category[]> {
    const categories = this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne(id);

    return category;
  }
}

export { CategoriesRepository };
