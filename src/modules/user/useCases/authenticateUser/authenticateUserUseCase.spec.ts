import { hash } from 'bcrypt';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsesRepositoryInMemory';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it('should be able to authenticate user', async () => {
    const hashedPassowrd = await hash('mysecurepassword', 8);

    const user = await usersRepositoryInMemory.create({
      name: 'John Marston',
      email: 'john@mail.com',
      password: hashedPassowrd,
    });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: hashedPassowrd,
    });

    expect(response).toHaveProperty('token');
  });
});
