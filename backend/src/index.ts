import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./socket/socket";
import useRoute from "./routes/userRoute";
import messageRoute from "./routes/messageRoute";

const app = express();

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

// Routes
app.use("/api/user", useRoute);
app.use("/api/message", messageRoute);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Create HTTP Server
const server = createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
