import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";
import bcrypt from 'bcrypt'
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique:true
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["admin", "user"],
  },
  profileImage: {
    type: String,
    required: [true,"Profile Image is required"],
  },
},{
    timestamps:true
});

UserSchema.pre('save',function(next){
   let hashedPasswd=bcrypt.hashSync(this.password,10);
   this.password=hashedPasswd;
   next();
})
const User=mongoose.model('user',UserSchema)
export default User

