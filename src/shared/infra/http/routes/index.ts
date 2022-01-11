import { Router } from 'express';

import { companiesRoutes } from './companies.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/companies', companiesRoutes);
routes.use('/users', usersRoutes);

export { routes };
