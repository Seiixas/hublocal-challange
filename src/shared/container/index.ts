import { container } from 'tsyringe';

import { CompaniesRepository } from '../../modules/company/infra/typeorm/repositories/CompaniesRepository';
import { ICompaniesRepository } from '../../modules/company/repositories/ICompaniesRepository';
import { UsersRepository } from '../../modules/user/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../../modules/user/repositories/IUsersRepository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
