"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_1 = require("./socket/socket");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
}));
// Routes
app.use("/api/user", userRoute_1.default);
app.use("/api/message", messageRoute_1.default);
// Root Route
app.get("/", (req, res) => {
    res.send("Hello World");
});
// Create HTTP Server
const server = (0, http_1.createServer)(app);
// Initialize Socket.IO
(0, socket_1.initializeSocket)(server);
// Start Server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
