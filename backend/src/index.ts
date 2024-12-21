import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./socket/socket";
import useRoute from "./routes/userRoute";
import messageRoute from "./routes/messageRoute";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// Routes
app.use("/api/user", useRoute);
app.use("/api/message", messageRoute);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Create HTTP Server
const server = createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start Server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
