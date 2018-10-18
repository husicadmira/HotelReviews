import Router from 'express'

import {userRouter} from './user';
import {hotelRouter} from './hotel';
import {reviewRouter} from './review';
import {favoriteRouter} from './favorite';

const router = new Router()

router.use('/users', userRouter);
router.use('/hotels', hotelRouter);
router.use('/review', reviewRouter);
router.use('/favorite', favoriteRouter);

export default router;