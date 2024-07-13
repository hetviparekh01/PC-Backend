import { controller, httpPost, httpPut } from "inversify-express-utils";
import { UserService } from "../services";
import { message, TYPES } from "../constants";
import { inject } from "inversify";
import {Request,Response} from 'express'
import { errorHandler } from "../utils/errorHandler";
import bcrypt from 'bcrypt'
import { multerErrorHandling, upload } from "../middlewares";
@controller("/user", TYPES.AuthMiddleware)
export class UserController {
  constructor(
    @inject<UserService>(TYPES.UserService) private userService: UserService
  ) {}

  @httpPut("/updateParticularUser",upload.single('profileImage'),multerErrorHandling)
  async updateParticularUser(req: Request, res: Response) {
    try {
      const id = req.headers.id as string;
     
      const userData = req.body;
       if(req.file){
        userData.profileImage=req.file?.filename
      }
      if (userData.password) {
        const hashedPasswd = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPasswd;
      }
      const data = await this.userService.updateUser(id, userData);
      return res.json({
        status: true,
        message: message.USERUPDATED,
        data: data,
      });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }
}