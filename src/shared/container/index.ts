import { container } from 'tsyringe';

import { CompaniesRepository } from '../../modules/company/infra/typeorm/repositories/CompaniesRepository';
import { ICompaniesRepository } from '../../modules/company/repositories/ICompaniesRepository';

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository
);
