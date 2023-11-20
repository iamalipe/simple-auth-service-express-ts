import { ValidationChain, body } from "express-validator";
import db from "../db";

export const registrationValidation: ValidationChain[] = [
  body("name").isString().trim().notEmpty().withMessage("Name is required"),
  body("username")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (value) => {
      // Check if the email is already registered
      const existingUser = await db.user.findUnique({
        where: { username: value },
      });
      if (existingUser) {
        throw new Error("Username is already exist");
      }
      return true;
    }),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      // Check if the email is already registered
      const existingUser = await db.user.findUnique({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error("Email is already registered");
      }
      return true;
    }),
  body("password")
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const loginValidation: ValidationChain[] = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password").isString().trim(),
];
