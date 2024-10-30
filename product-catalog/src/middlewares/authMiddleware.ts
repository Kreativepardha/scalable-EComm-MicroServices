import { Request, Response, NextFunction } from 'express'
import Jwt, { decode } from "jsonwebtoken";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }
    try {
        const decoded = Jwt.verify(token, JWT_SECRET) as { email: string}
        req.user = decoded;
        next()
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });   
    }
}