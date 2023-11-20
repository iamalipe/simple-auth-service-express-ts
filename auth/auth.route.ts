// auth.route.ts
import express from "express";
import { Request, Response } from "express";

import { loginValidation, registrationValidation } from "./auth.helper";
import { login, register } from "./auth.controller";

export const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "";

authRouter.post("/register", registrationValidation, register);

authRouter.post("/login", loginValidation, login);

authRouter.post("/forgot-password", async (req: Request, res: Response) => {
  // Logic for sending a password reset email
  // You may want to generate a reset token and send an email to the user
  res.send("Forgot Password route");
});

authRouter.post("/reset-password", async (req: Request, res: Response) => {
  // Logic for resetting the password using the reset token
  // You may want to verify the reset token and update the user's password
  res.send("Reset Password route");
});
