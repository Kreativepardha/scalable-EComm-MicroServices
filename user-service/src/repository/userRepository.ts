import { IUser } from "../interfaces/UserInterface";
import User from "../models/UserModel";



export class UserRepository{ 
    async create(user: IUser): Promise<IUser> {
        return User.create(user)
    }
    async findByEmail(email: string): Promise<IUser | null>{
        return User.findOne({ email })
    }
}