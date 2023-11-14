import { JwtPayload } from "./../types";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.jwtPayload = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Unauthorized: Invalid token");
  }
};
