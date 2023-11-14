import { UserRole } from "@prisma/client";

export interface JwtPayload {
  userId: string;
  role: UserRole;
  email: string;
  username: string;
  imageUrl: string;
}

declare global {
  namespace Express {
    interface Request {
      jwtPayload?: JwtPayload;
    }
  }
}
