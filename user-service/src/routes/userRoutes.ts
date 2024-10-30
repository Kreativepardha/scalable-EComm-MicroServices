import express from "express";
import {
  deleteUser,
  getUserByEmail,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/email/:email", getUserByEmail);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as userRouter };
