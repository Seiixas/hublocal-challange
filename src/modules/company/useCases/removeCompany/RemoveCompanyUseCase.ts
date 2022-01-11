import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors';
import { IUsersRepository } from '../../../user/repositories/IUsersRepository';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

interface IRequest {
  id: string;
  user_id: string;
  password: string;
}

@injectable()
class RemoveCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, user_id, password }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError('Password incorrect!', 401);
    }

    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError('This company does not exists!');
    }

    const companyOwnsToUser = company.created_by === user.id;

    if (!companyOwnsToUser && !user.admin) {
      throw new AppError('This is not your company', 401);
    }

    await this.companiesRepository.remove(id);
  }
}

export { RemoveCompanyUseCase };
