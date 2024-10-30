import Jwt from "jsonwebtoken";
import { IUser } from "../interfaces/UserInterface";
import { UserRepository } from "../repository/userRepository";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "..";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async registerUser(user: IUser) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      ...user,
      password: hashedPassword,
    };
    return this.userRepository.create(newUser);
  }
  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = Jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: '10d'
    });
    return { user, token };
  }
  async findUserByEmail(email: string) {
    return this.userRepository.findByEmail(email)
  }
  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string): Promise<{ deletedCount?: number }> {
    return this.userRepository.deleteUser(id);
  }

}
