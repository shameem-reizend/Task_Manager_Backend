import express from 'express';
import {UserRegister, userLogin, userLogout, refreshUserToken, profileImages } from '../controllers/userController';
import upload from '../config/cloudinaryConfig'

const userRouter = express.Router();

userRouter.post('/register',upload.single('file'), UserRegister);
userRouter.post('/login', userLogin);
userRouter.get('/logout', userLogout);
userRouter.get('/refresh-token', refreshUserToken);
userRouter.get('/user_details', profileImages)
export default userRouter;