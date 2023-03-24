import { Router } from 'express';
import * as UserCtrl from '../controllers/userController';

const userRouter: Router = Router();

// Get routes relating to users
userRouter.get('/', UserCtrl.findAllUsers);
userRouter.get('/:id', UserCtrl.findUserById);

// Post routes relating to users
userRouter.post('/register', UserCtrl.register);
userRouter.post('/login', UserCtrl.login);

export default userRouter;
