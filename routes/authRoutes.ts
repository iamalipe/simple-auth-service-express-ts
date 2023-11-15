// authRoutes.ts
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Request, Response } from "express";

import db from "../db";
import {
  loginValidation,
  registrationValidation,
} from "../validations/authRoutesValidation";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "";

router.post(
  "/register",
  registrationValidation,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, username } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.user.create({
        data: {
          name,
          email,
          username,
          password: hashedPassword,
        },
      });

      res.status(201).json("User created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/login", loginValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).send("Invalid email");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid password");
    }

    await db.user.update({
      where: { id: user.id },
      data: {

      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
        imageUrl: user.imageUrl,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/forgot-password", async (req: Request, res: Response) => {
  // Logic for sending a password reset email
  // You may want to generate a reset token and send an email to the user
  res.send("Forgot Password route");
});

router.post("/reset-password", async (req: Request, res: Response) => {
  // Logic for resetting the password using the reset token
  // You may want to verify the reset token and update the user's password
  res.send("Reset Password route");
});

export default router;
