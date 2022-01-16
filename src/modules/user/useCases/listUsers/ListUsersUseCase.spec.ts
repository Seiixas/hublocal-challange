import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsesRepositoryInMemory';
import { ListUsersUseCase } from './ListUsersUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUsersUseCase: ListUsersUseCase;

describe('List users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it('should be able to list users', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'John Marston',
      email: 'john@mail.com',
      password: 'mysecurepassword',
    });

    const response = {
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
      },
    };

    const users = await listUsersUseCase.execute();

    expect(users).toEqual([response]);
  });
});
