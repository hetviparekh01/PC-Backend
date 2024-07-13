import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces";

const CategorySchema = new Schema<ICategory>({
  categoryName: {
    type: String,
    required: [true, "Category Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
},{
    timestamps:true
});

const Category=mongoose.model('category',CategorySchema)
export default Category