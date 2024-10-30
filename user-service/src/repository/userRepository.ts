import { IUser } from "../interfaces/UserInterface";
import User from "../models/UserModel";

export class UserRepository {
  async create(user: IUser): Promise<IUser> {
    return User.create(user);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }
  async updateUser(id: string, data: Partial<IUser>) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteUser(id: string) {
    return User.deleteOne({ _id: id });
  }

}
