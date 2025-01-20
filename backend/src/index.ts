import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./socket/socket";
import useRoute from "./routes/userRoute";
import messageRoute from "./routes/messageRoute";
import ProtectRoute from "./middleware/protectRoute";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use("/api/user",ProtectRoute,  useRoute);
app.use("/api/message",ProtectRoute, messageRoute);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});


// app.use((err: Error, req: Request, res: Response, next: Function) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });


const server = createServer(app);

initializeSocket(server);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
