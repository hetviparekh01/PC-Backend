import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces";

const ProductSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: [true, "Product Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  productImage: {
    type: String,
    required: [true, "Profile Image is required"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'category',
    required: [true, "Category Id is required"],
  },
},{
    timestamps:true
});

const Product=mongoose.model('product',ProductSchema)
export default Product