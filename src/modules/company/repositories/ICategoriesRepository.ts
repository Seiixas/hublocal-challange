import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../infra/typeorm/entities/Category';

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;

  remove(id: string): Promise<void>;

  all(): Promise<Category[]>;

  findByName(name: string): Promise<Category>;

  findById(id: string): Promise<Category>;
}

export { ICategoriesRepository };
