import { Router } from 'express';

import { CreateCategoryController } from '../../../../modules/company/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../../../../modules/company/useCases/listCategories/ListCategoriesController';
import { ensureAdministrator } from '../middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdministrator,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

export { categoriesRoutes };
