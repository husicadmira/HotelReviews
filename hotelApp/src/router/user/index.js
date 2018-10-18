import Router from 'express';

import * as controller from './controller';
import { authenticate } from '../../middleware/authenticate';
import { isAdmin } from '../../middleware/permit';

const userRouter = new Router();

userRouter.post('/', controller.register);
userRouter.post('/login', controller.login);

userRouter.delete('/logout', authenticate, controller.logout);
userRouter.get('/me', authenticate, isAdmin, controller.getLoggedInUser);
userRouter.get('/', authenticate, isAdmin, controller.getAll);

export { userRouter };
