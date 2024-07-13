import { Request,Response,NextFunction } from "express"
import { message, statusCode } from "../constants";

export const RoleMiddleware=(roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const userRole=req.headers.role as string;
        if(!roles.includes(userRole)){
            return res.json({status:false,message:message.UNAUTHORIZEDACCESS,statusCode:statusCode.Forbidden})
        }
        next();
    }
}