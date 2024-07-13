import {Request,Response, NextFunction } from "express";
import { message, statusCode } from "../constants";
import jwt from 'jsonwebtoken';
import config from 'config'
import { BaseMiddleware } from "inversify-express-utils";
import { errorHandler } from "../utils/errorHandler";

export class AuthMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction) {  
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if(!token){
                return res.json({status:false,statusCode:statusCode.Unauthorized,message:message.USERNOTLOGGEDIN})
            }
            const decoded:any=jwt.verify(token, config.get("SECRET_KEY") as string) ;
            req.headers.id=decoded._id;
            req.headers.role=decoded.role
              next();
          } catch (error) {
                const errorMessage=errorHandler(error);
                return res.json({status:false,...errorMessage})
          }
    }
}
  