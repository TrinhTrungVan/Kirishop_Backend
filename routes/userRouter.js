import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.delete("/:id", deleteUser);
userRouter.patch("/", updateUser);
userRouter.get("/", getUsers);

export default userRouter;
