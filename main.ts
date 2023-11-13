import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

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

app.get("/", async (req, res) => {
  res.send("Hello World, simple-auth-service-express-ts");
});

app.get("/ping", async (req, res) => {
  res.send("pong!");
});

app.listen(EXPRESS_PORT, () => {
  console.log(`🟢 App is running on port ${EXPRESS_PORT}.`);
});
