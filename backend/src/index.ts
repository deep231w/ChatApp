import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./socket/socket";
import messageHandler from "./routeHandler/messageHandler"
import userHandler from "./routeHandler/userHandler"
import firebaseVerifyToken from "./middleware/protectRoute";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT =  3000;
const CLIENT_ORIGIN =  "http://localhost:5173";

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],

  })
);
app.use(cookieParser());

app.use("/api/user",firebaseVerifyToken,  userHandler);
app.use("/api/message",firebaseVerifyToken, messageHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const server = createServer(app);

initializeSocket(server);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
