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
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: CLIENT_ORIGIN,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
}));
app.use("/api/user", userRoute_1.default);
app.use("/api/message", messageRoute_1.default);
// Root Route
app.get("/", (req, res) => {
    res.send("Hello World");
});
// app.use((err: Error, req: Request, res: Response, next: Function) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });
const server = (0, http_1.createServer)(app);
(0, socket_1.initializeSocket)(server);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
