import { hash } from 'bcrypt';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsesRepositoryInMemory';
import { RemoveUserUseCase } from './RemoveUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let removeUserUseCase: RemoveUserUseCase;

describe('', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    removeUserUseCase = new RemoveUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to remove a user', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'John Marston',
      email: 'john@mail.com',
      password: await hash('mysecurepassword', 8),
    });

    await removeUserUseCase.execute({
      user_id: user.id,
      password: user.password,
    });
  });
});
