import { injectable } from "inversify";
import { IUser } from "../interfaces";
import User from "../models/user.model";


@injectable()
export class UserService{
    async updateUser(userId:string,userData:IUser){
        try {
           const data = await User.findByIdAndUpdate(userId,{username:userData.username,email:userData.email,role:userData.role,profileImage:userData.profileImage,password:userData.password})
           return data
        } catch (error:any) {
            throw(error)
        }
    }

}