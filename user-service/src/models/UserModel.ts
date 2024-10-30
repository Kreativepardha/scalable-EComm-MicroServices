import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/UserInterface";

interface UserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
