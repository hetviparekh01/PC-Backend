import { injectable } from "inversify";
import { ICategory } from "../interfaces";
import Category from "../models/category.model";

@injectable()
export class CategoryService{
    async addCategory(categoryData:ICategory){
        try {
            await Category.create(categoryData)
        } catch (error:any) {
            throw(error)
        }
    }

    async updateCategory(categoryId:string,categoryData:ICategory){
        try {
            await Category.findByIdAndUpdate(categoryId,categoryData)
        } catch (error:any) {
            throw(error)
        }
    }

    async deleteCategory(categoryId:string){
        try {
            await Category.findByIdAndDelete(categoryId)
        } catch (error:any) {
            throw(error)
        }
    }

    async getAllCategories(){
        try {
           const data= await Category.find({});
           return data
        } catch (error:any) {
            throw(error)
        }
    }
}