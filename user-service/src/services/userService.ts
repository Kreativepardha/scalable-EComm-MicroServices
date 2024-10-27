import { IUser } from "../interfaces/UserInterface";
import { UserRepository } from "../repository/userRepository";


export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository()
    }
    async registerUser(user: IUser) {
        return this.userRepository.create(user)
     }
     async findUserByEmail(email: string) {
        return this.userRepository.findByEmail(email)
     }







}