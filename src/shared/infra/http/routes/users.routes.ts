import { Router } from 'express';

import { AuthenticateUserController } from '../../../../modules/user/useCases/authenticateUser/AuthenticateUserController';
import { CreateAddressController } from '../../../../modules/user/useCases/createAddress/CreateAddressController';
import { CreateUserController } from '../../../../modules/user/useCases/createUser/CreateUserController';
import { ListUsersController } from '../../../../modules/user/useCases/listUsers/ListUsersController';
import { RemoveUserController } from '../../../../modules/user/useCases/removeUser/RemoveUserController';
import { ensureAdministrator } from '../middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createAddressController = new CreateAddressController();
const removeUserController = new RemoveUserController();

usersRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdministrator,
  listUsersController.handle
);
usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/auth', authenticateUserController.handle);
usersRoutes.post(
  '/address',
  ensureAuthenticated,
  createAddressController.handle
);
usersRoutes.delete('/', ensureAuthenticated, removeUserController.handle);

export { usersRoutes };
