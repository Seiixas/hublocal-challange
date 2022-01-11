import { Router } from 'express';

import { ApproveCompanyController } from '../../../../modules/company/useCases/approveCompany/ApproveCompanyController';
import { CreateCompanyController } from '../../../../modules/company/useCases/createCompany/CreateCompanyController';
import { ListCompaniesController } from '../../../../modules/company/useCases/listCompanies/ListCompaniesController';
import { ListUnapprovedCompaniesController } from '../../../../modules/company/useCases/listUnaprovedCompanies/ListUnaprovedUnaprovedCompaniesController';
import { RemoveCompanyController } from '../../../../modules/company/useCases/removeCompany/RemoveCompanyController';
import { ensureAdministrator } from '../middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompaniesController = new ListCompaniesController();
const listUnapprovedController = new ListUnapprovedCompaniesController();
const approveCompanyController = new ApproveCompanyController();
const removeCompanyController = new RemoveCompanyController();

companiesRoutes.post('/', ensureAuthenticated, createCompanyController.handle);

companiesRoutes.get('/', listCompaniesController.handle);

companiesRoutes.get(
  '/unapproved',
  ensureAuthenticated,
  ensureAdministrator,
  listUnapprovedController.handle
);

companiesRoutes.delete(
  '/:company_id',
  ensureAuthenticated,
  removeCompanyController.handle
);

companiesRoutes.put(
  '/approve/:company_id',
  ensureAuthenticated,
  ensureAdministrator,
  approveCompanyController.handle
);

export { companiesRoutes };
