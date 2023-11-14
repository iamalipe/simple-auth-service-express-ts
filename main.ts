import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import { authenticate, authorize } from "./middlewares";
import { UserRole } from "@prisma/client";

const EXPRESS_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://chat-app-react-ts-six.vercel.app",
//     ],
//   })
// );

app.use("/auth", authRoutes);

app.get("/", async (req, res) => {
  res.send("Hello World, simple-auth-service-express-ts");
});

app.get("/ping", async (req, res) => {
  res.send("pong!");
});

app.get("/protected", authenticate, authorize(), (req, res) => {
  // Access jwtPayload in the response
  const { jwtPayload } = req;
  if (jwtPayload) {
    // Use jwtPayload.userId, jwtPayload.role, etc.
  }

  res.send("This is a protected route");
});

app.listen(EXPRESS_PORT, () => {
  console.log(`🟢 App is running on port ${EXPRESS_PORT}.`);
});
