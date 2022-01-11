import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { companiesRoutes } from './companies.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/companies', companiesRoutes);
routes.use('/users', usersRoutes);
routes.use('/categories', categoriesRoutes);

export { routes };
