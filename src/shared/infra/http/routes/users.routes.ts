import { Router } from 'express';

import { AuthenticateUserController } from '../../../../modules/user/useCases/authenticateUser/AuthenticateUserController';
import { CreateAddressController } from '../../../../modules/user/useCases/createAddress/CreateAddressController';
import { CreateUserController } from '../../../../modules/user/useCases/createUser/CreateUserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createAddressController = new CreateAddressController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/auth', authenticateUserController.handle);
usersRoutes.post(
  '/address',
  ensureAuthenticated,
  createAddressController.handle
);

export { usersRoutes };
