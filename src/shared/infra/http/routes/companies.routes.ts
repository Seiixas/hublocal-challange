import { Router } from 'express';

import { CreateCompanyController } from '../../../../modules/company/useCases/createCompany/CreateCompanyController';
import { ListCompaniesController } from '../../../../modules/company/useCases/listCompanies/ListCompaniesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompaniesController = new ListCompaniesController();

companiesRoutes.post('/', ensureAuthenticated, createCompanyController.handle);

companiesRoutes.get('/', listCompaniesController.handle);

export { companiesRoutes };
