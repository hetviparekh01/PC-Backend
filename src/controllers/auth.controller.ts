import { inject } from "inversify";
import { message, TYPES } from "../constants";
import { controller, httpPost } from "inversify-express-utils";
import { AuthService } from "../services";
import { upload } from "../middlewares";
import { Request,Response } from "express";
import { errorHandler } from "../utils/errorHandler";
@controller("/auth")
export class AuthController {
  constructor(
    @inject<AuthService>(TYPES.AuthService) private authService: AuthService
  ) {}

  @httpPost("/signup", upload.single("profileImage"))
  async signup(req: Request, res: Response) {
    try {
      const userData = req.body;
      userData.profileImage = req.file?.filename;
      await this.authService.signup(userData);
      return res.json({ status: true, message: message.USERSIGNEDUP });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpPost('/login')
  async login(req: Request, res: Response){
    try {
        const userData=req.body;
        const data=await this.authService.login(userData);
        return res.json({status:true,message:message.USERLOGGEDIN,data:data})
    } catch (error:any) {
           const errorMessage = errorHandler(error);
           return res.json({ status: false, ...errorMessage });
    }
  }

  
}