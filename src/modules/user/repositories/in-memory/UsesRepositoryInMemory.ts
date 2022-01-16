import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { Address } from '../../infra/typeorm/entities/Address';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
    });

    this.users.push(user);
  }

  async all(): Promise<User[]> {
    return this.users;
  }

  async remove(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users.splice(userIndex, 1);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findAddress(id: string): Promise<Address> {
    throw new Error(`Method not implemented.${id}`);
  }
}

export { UsersRepositoryInMemory };
