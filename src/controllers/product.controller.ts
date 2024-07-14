import { controller, httpPost } from "inversify-express-utils";
import { CategoryService } from "../services";
import { inject } from "inversify";
import { message, TYPES } from "../constants";
import { Request,Response } from "express";
import { RoleMiddleware } from "../middlewares";
import { errorHandler } from "../utils/errorHandler";

@controller("/product",TYPES.AuthMiddleware,RoleMiddleware(["admin"]))
export class ProdutController{
    constructor(
        @inject<CategoryService>(TYPES.CategoryService) private categoryService: CategoryService
      ) {}
   
}