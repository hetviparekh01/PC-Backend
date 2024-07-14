import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { UserService } from "../services";
import { message, TYPES } from "../constants";
import { inject } from "inversify";
import { Request, Response } from 'express'
import { errorHandler } from "../utils/errorHandler";
import bcrypt from 'bcrypt'
import { multerErrorHandling, upload } from "../middlewares";
import { CategoryService } from "../services/category.service";
@controller("/user", TYPES.AuthMiddleware)
export class UserController {
  constructor(
    @inject<UserService>(TYPES.UserService) private userService: UserService,
    @inject<CategoryService>(TYPES.CategoryService) private categoryService: CategoryService
  ) { }

  @httpPut("/updateParticularUser", upload.single('profileImage'), multerErrorHandling)
  async updateParticularUser(req: Request, res: Response) {
    try {
      const id = req.headers.id as string;

      const userData = req.body;
      if (req.file) {
        userData.profileImage = req.file?.filename
      }
      if (userData.password) {
        const hashedPasswd = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPasswd;
      }
      await this.userService.updateUser(id, userData);
      return res.json({
        status: true,
        message: message.USERUPDATED,
      });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpPut("/updateUserById/:id")
  async updateUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userData = req.body;
      if (req.file) {
        userData.profileImage = req.file?.filename
      }
      if (userData.password) {
        const hashedPasswd = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPasswd;
      }
      await this.userService.updateUser(id, userData);
      return res.json({
        status: true,
        message: message.USERUPDATED,
      });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpDelete("/deleteParticularUser")
  async deleteParticularUser(req: Request, res: Response) {
    try {
      const id = req.headers.id as string;
      await this.userService.deleteUser(id);
      return { status: true, message: message.USERDELETED }
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpDelete("/deleteUserById/:id")
  async deleteUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.userService.deleteUser(id);
      return { status: true, message: message.USERDELETED }
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getUserById/:id")
  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await this.userService.getUserById(id);
      return { status: true, data: data }
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getAllUser")
  async getAllUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await this.userService.getAllUser()
      return { status: true, data: data }
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

 
}