import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import { UpdateUserSchema, UserSchema } from "../utils/userValidator";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = UserSchema.parse(req.body);
    const user = await userService.registerUser(userData);
    res.status(201).json(user);
  } catch (err: any) {
        next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email , password} = req.body
        const { user, token } = await userService.loginUser(email, password)
        res.status(200).json({
            user, token
        })
    } catch (err) {
      next(err);
    }
} 

export const getUserByEmail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const user = await userService.findUserByEmail(email)
        if(!user) {
            return res.status(404).json({
                error:'User not found'
            })
        }
            res.status(200).json({
                user
            })
    } catch (err) {
     next(err);
    }
}


export const updateUser = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const userData = UpdateUserSchema.parse(req.body)
        const user = await userService.updateUser(userId, userData)
            if(!user) {
                return res.status(404).json({
                    error:'user not found'
                })
            }
            res.status(200).json({
                user
            })
        } catch (err) {
      next(err);
    }
}


export const deleteUser = async (req: Request, res: Response, next: NextFunction)  => {
        try {
            const userId = req.params.id;
            const result = await userService.deleteUser(userId)
            if(result.deletedCount === 0) {
                return res.status(404).json({
                    error: 'User not found'
                })
            }   
            res.status(204).send()
            
        } catch (err) {
         next(err); 
        }
}