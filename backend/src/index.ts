import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./socket/socket";
import useRoute from "./routes/userRoute";
import messageRoute from "./routes/messageRoute";
import cookieHandler from "./routeHandler/cookieHandler"

import dotenv from "dotenv";

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
  })
);
app.use("/api/user",cookieHandler);

app.use("/api/user",  useRoute);
app.use("/api/message", messageRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const server = createServer(app);

initializeSocket(server);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
