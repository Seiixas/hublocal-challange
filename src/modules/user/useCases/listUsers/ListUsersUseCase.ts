import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<IResponse[]> {
    const users = await this.usersRepository.all();
    const userResponse: IResponse[] = [];

    users.forEach((user) => {
      userResponse.push({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });

    return userResponse;
  }
}

export { ListUsersUseCase };
