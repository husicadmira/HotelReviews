import Router from 'express';

import * as controller from './controller';
import { authenticate } from '../../middleware/authenticate';

const favoriteRouter = new Router();

favoriteRouter.post('/:id', authenticate, controller.addFavorite);
favoriteRouter.delete('/:id', authenticate, controller.removeFavorite);
favoriteRouter.get('/', authenticate, controller.getFavorites);

export {favoriteRouter};