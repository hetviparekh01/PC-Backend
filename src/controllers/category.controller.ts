import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { message, TYPES } from "../constants";
import { RoleMiddleware } from "../middlewares";
import { inject } from "inversify";
import { Request,Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { CategoryService } from "../services";

@controller("/category")
export class CategoryController{
    constructor(
        @inject<CategoryService>(TYPES.CategoryService) private categoryService: CategoryService
      ) {}

      @httpPost("/addCategory")
      async addCategory(req:Request,res:Response){
        try {
            const categoryData=req.body;
            await this.categoryService.addCategory(categoryData)
            return {status:true,message:message.CATEGORYADDED}
        } catch (error:any) {
            const errorMessage = errorHandler(error);
            return res.json({ status: false, ...errorMessage });  
        }
      }

      @httpDelete("/deleteCategory/:id")
      async deleteParticularUser(req: Request, res: Response) {
        try {
          const id = req.params.id as string;
          await this.categoryService.deleteCategory(id);
          return { status: true, message: message.CATEGORYDELETD }
        } catch (error: any) {
          const errorMessage = errorHandler(error);
          return res.json({ status: false, ...errorMessage });
        }
      }

      @httpPut("/updateCategory/:id")
      async updateCategory(req:Request,res:Response){
        try {
            const id=req.params.id;
            const categoryData=req.body;
            await this.categoryService.updateCategory(id,categoryData);
            return { status: true, message: message.CATEGORYUPDATED }
        } catch (error:any) {
            const errorMessage = errorHandler(error);
            return res.json({ status: false, ...errorMessage });
        }
      }

      @httpGet("/getAllCategories")
      async getAllCategories(req:Request,res:Response){
        try {
            const data=await this.categoryService.getAllCategories();
            return { status: true, data:data }
        } catch (error:any) {
            const errorMessage = errorHandler(error);
            return res.json({ status: false, ...errorMessage });
        }
      }
}
