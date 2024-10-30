import express from "express";
import "dotenv/config";
import { applySecurityMiddleware } from "./middlewares/security";
import { userRouter } from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";

export const JWT_SECRET = process.env.JWT_SECRET || "default";
export const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());
applySecurityMiddleware(app);

app.use("/users", userRouter);
app.use(errorHandler);


export default app;
