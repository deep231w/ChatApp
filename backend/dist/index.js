"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_1 = require("./socket/socket");
const messageHandler_1 = __importDefault(require("./routeHandler/messageHandler"));
const userHandler_1 = __importDefault(require("./routeHandler/userHandler"));
const protectRoute_1 = __importDefault(require("./middleware/protectRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = 3000;
const CLIENT_ORIGIN = "http://localhost:5173";
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: CLIENT_ORIGIN,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
}));
app.use("/api/user", protectRoute_1.default, userHandler_1.default);
app.use("/api/message", protectRoute_1.default, messageHandler_1.default);
app.get("/", (req, res) => {
    res.send("Hello World");
});
const server = (0, http_1.createServer)(app);
(0, socket_1.initializeSocket)(server);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
