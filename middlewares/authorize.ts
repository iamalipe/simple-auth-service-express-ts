import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const authorize = (roles: UserRole[] = [UserRole.DEFAULT]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const role = req.jwtPayload?.role;

    if (!role) {
      return res.status(401).send("Unauthorized: role not found");
    }

    if (!roles.includes(role)) {
      return res.status(403).send("Forbidden: Insufficient permissions");
    }

    next();
  };
};
