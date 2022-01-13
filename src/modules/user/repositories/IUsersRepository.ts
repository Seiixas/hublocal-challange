import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { Address } from '../infra/typeorm/entities/Address';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;

  all(): Promise<User[]>;

  remove(id: string): Promise<void>;

  findByEmail(email: string): Promise<User>;

  findById(id: string): Promise<User>;

  findAddress(id: string): Promise<Address>;
}

export { IUsersRepository };
