import Router from 'express';

import * as controller from './controller';
import { authenticate } from '../../middleware/authenticate';
import { isAdmin } from '../../middleware/permit';

const hotelRouter = new Router();

hotelRouter.post('/', authenticate, isAdmin, controller.add)

hotelRouter.get('/', authenticate, controller.getAll)
hotelRouter.get('/:id', authenticate, controller.get)

hotelRouter.delete('/:id', authenticate, isAdmin, controller.remove)
hotelRouter.put('/:id', authenticate, isAdmin, controller.update)

export {hotelRouter}
