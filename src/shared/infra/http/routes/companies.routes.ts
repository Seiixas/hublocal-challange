import { Router } from 'express';

import { CreateCompanyController } from '../../../../modules/company/useCases/createCompany/CreateCompanyController';
import { ListCompaniesController } from '../../../../modules/company/useCases/listCompanies/ListCompaniesController';

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompaniesController = new ListCompaniesController();

companiesRoutes.post('/', createCompanyController.handle);

companiesRoutes.get('/', listCompaniesController.handle);

export { companiesRoutes };
