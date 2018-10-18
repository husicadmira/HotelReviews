import Router from 'express';

import * as controller from './controller';
import { authenticate } from '../../middleware/authenticate';

const reviewRouter = new Router()
reviewRouter.post('/:id', authenticate, controller.addReview)
reviewRouter.get('/:id', authenticate, controller.getReviews)

reviewRouter.post('/like/:id', authenticate, controller.addLike)
reviewRouter.delete('/like/:id', authenticate, controller.removeLike)
reviewRouter.post('/dislike/:id', authenticate, controller.addDislike)
reviewRouter.delete('/dislike/:id', authenticate, controller.removeDislike)

reviewRouter.get('/dislike/:id', authenticate, controller.getDislikesForReview)
reviewRouter.get('/like/:id', authenticate, controller.getLikesForReview)


export {reviewRouter};
