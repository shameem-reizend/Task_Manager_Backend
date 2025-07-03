import express from 'express';
import { UserRegister, userLogin, userLogout, refreshUserToken, profileImages, forgetPassword, resetPassword } from '../controllers/userController';
import upload from '../config/cloudinaryConfig'
import { validation } from '../middlewares/validationMiddleware';
import { RegisterSchema } from '../validations/RegisterValidator';

const userRouter = express.Router();

userRouter.post('/register', upload.single('file'), validation(RegisterSchema), UserRegister);
userRouter.post('/login', userLogin);
userRouter.get('/logout', userLogout);
userRouter.get('/refresh-token', refreshUserToken);
userRouter.get('/user_details', profileImages);
userRouter.post('/forgot-password', forgetPassword);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter;