import { Router } from 'express';

import { AuthenticateUserController } from '../../../../modules/user/useCases/authentiateUser/AuthenticateUserController';
import { CreateUserController } from '../../../../modules/user/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/auth', authenticateUserController.handle);

export { usersRoutes };
