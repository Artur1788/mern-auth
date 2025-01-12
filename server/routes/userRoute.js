import { Router } from 'express';

import {
  login,
  register,
  getUser,
  getAllUsers,
  logOut,
  refresh,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/get-user', authMiddleware, getUser);
userRouter.get('/get-users', authMiddleware, getAllUsers);
userRouter.post('/logout', logOut);
userRouter.get('/refresh', refresh);
