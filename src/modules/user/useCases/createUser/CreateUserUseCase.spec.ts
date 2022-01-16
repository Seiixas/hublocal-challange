import { AppError } from '../../../../shared/errors';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsesRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new users', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Marston',
      email: 'john@mail.com',
      password: 'mysecurepassword',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with an email already registred', () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'John Marston',
        email: 'john@mail.com',
        password: 'mysecurepassword',
      });

      await createUserUseCase.execute({
        name: 'Arthur Morgan',
        email: 'john@mail.com',
        password: 'mypreciouspassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
