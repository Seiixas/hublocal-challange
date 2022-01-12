import { container } from 'tsyringe';

import { CategoriesRepository } from '../../modules/company/infra/typeorm/repositories/CategoriesRepository';
import { CompaniesRepository } from '../../modules/company/infra/typeorm/repositories/CompaniesRepository';
import { ICategoriesRepository } from '../../modules/company/repositories/ICategoriesRepository';
import { ICompaniesRepository } from '../../modules/company/repositories/ICompaniesRepository';
import { AddressesRepository } from '../../modules/user/infra/typeorm/repositories/AddressesRepository';
import { UsersRepository } from '../../modules/user/infra/typeorm/repositories/UsersRepository';
import { IAddressesRepository } from '../../modules/user/repositories/IAddressesRepository';
import { IUsersRepository } from '../../modules/user/repositories/IUsersRepository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository
);
