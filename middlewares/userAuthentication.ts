import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
}
const access_scret_key = getEnvVariable('ACCESS_TOKEN_SECRET_KEY');

export const AuthenticateToken = (req: any, res: any, next: () => void) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.json({message: 'token not found'})
    }
    jwt.verify(token, access_scret_key, (error:any, user: any) => {
        if(error){
            res.json({
                message:'Token Expired'
            })
        } else{
            req.user = user
            next()
        }
    })
}

export const IsAdmin = (req: any, res: any, next: () => void) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.json({
        message: "You are not logged in",
        });
    } else {
        jwt.verify(token, access_scret_key, (error: any, decoded: any) => {
        if (error) {
            res.json({
            message: "Token is invalid",
            });
        } else {
            req.userData = decoded;
            if (req.userData.role === "admin") {
            return next();
            }
            res.json({
            message: `This page is only accessible to admin`,
            });
        }
        });
    }
};