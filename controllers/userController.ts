import { Request, Response } from 'express';
import User from  '../models/UserModel'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { error } from 'console';
import upload from '../config/cloudinaryConfig';
import cookieParser from 'cookie-parser';

dotenv.config();

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
}
const access_scret_key = getEnvVariable('ACCESS_TOKEN_SECRET_KEY');
const refresh_scret_key = getEnvVariable('REFRESH_TOKEN_SECRET_KEY');

export const UserRegister = async (req: any, res: any) => {
    console.log(req.file);
    const { username, password, role } = req.body;
    console.log(username, password, role)
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({
        username: username,
        password: hashedPassword,
        role: role,
        profile_url: req.file.path
        });

        res.json({
        message: "Registration Successful",
        });
    } catch (error) {
        res.json({
        message: "Provide valid inputs",
        error
        });
    }
};

function generateAccessToken(user: any){
    return jwt.sign(user, access_scret_key, { expiresIn: '15m' });
}

export const userLogin = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const userFound = await User.findOne({
        username: username,
    });
    if(userFound && (await bcrypt.compare(password, userFound.password.toString()))){
        const user = {
            username: username,
            role: userFound.role,
            id: userFound.id
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, refresh_scret_key, { expiresIn: '7d' });
        
        res
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: false })
        .json({ 
            accessToken: accessToken,
        });
    } else{
        res.json({
            message: 'Invalid Credentials'
        })
    }
    
};

export const refreshUserToken = (req: Request, res: Response) => {
    const refreshToken =  req.cookies.refreshToken;
    if(refreshToken == null){
        res.json({
            message: 'log in or provide valid credentials'
        })
    } 
    if(!refreshToken){
        res.json({
            message: 'cannot find matching refresh token'
        })
    }

    jwt.verify(refreshToken, refresh_scret_key, (err: any, user: any) => {
        if(err){
            res.json({
                message: 'the client is authenticated but lacks the necessary permissions to access the resource'
            })
        }
        const accessToken = generateAccessToken({username: user.username, role: user.role, id: user.id})
        res.json({
            accessToken: accessToken
        })

    })
};

export const userLogout = (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.json({
        message: "Logout successful"
    })
};

export const profileImages =  async(req: any, res: any) => {
    try{
    const profilePics = await User.find({}, 'profile_url').lean();

        res.json({
            profilePics,
        })
    } catch(erro){
        res.json({
            message: "No profile urls found"
        })
    }
};