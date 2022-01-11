import { Router } from 'express';

import { ApproveCompanyController } from '../../../../modules/company/useCases/approveCompany/ApproveCompanyController';
import { CreateCompanyController } from '../../../../modules/company/useCases/createCompany/CreateCompanyController';
import { ListCompaniesController } from '../../../../modules/company/useCases/listCompanies/ListCompaniesController';
import { ensureAdministrator } from '../middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompaniesController = new ListCompaniesController();
const approveCompanyController = new ApproveCompanyController();

companiesRoutes.post('/', ensureAuthenticated, createCompanyController.handle);

companiesRoutes.get('/', listCompaniesController.handle);

companiesRoutes.put(
  '/approve/:company_id',
  ensureAuthenticated,
  ensureAdministrator,
  approveCompanyController.handle
);

export { companiesRoutes };
