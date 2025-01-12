import Router from 'express';

import { userRouter } from './userRoute.js';

export const mainRouter = Router();

mainRouter.use('', userRouter);
