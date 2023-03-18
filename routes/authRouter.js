import express from "express";
import { userSignin, userSignup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/signin", userSignin);

export default authRouter;
