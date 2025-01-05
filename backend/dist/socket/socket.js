"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
let io; // Exportable Socket.IO instance for future use
const initializeSocket = (server) => {
    exports.io = io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["POST", "GET"],
            credentials: true,
        },
    });
    const onlineusers = {};
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        //register socket id
        socket.on("register", (userId) => {
            onlineusers[userId] = socket.id;
            console.log(`${userId}=${socket.id}`);
        });
        socket.on("private_message", ({ senderId, reciverId, message }) => {
            const reciverSocketid = onlineusers[reciverId];
            if (reciverSocketid) {
                io.to(reciverSocketid).emit("recive_message", {
                    senderId,
                    message
                });
            }
        });
        socket.on("disconnect", () => {
            for (const [userId, socketId] of Object.entries(onlineusers)) {
                if (socketId == socket.id) {
                    delete onlineusers[userId];
                    console.log(`${userId} disconnected`);
                    break;
                }
            }
        });
        // Handle send_message event
        // socket.on("send_message", (message) => {
        //   console.log("Backend message:", message);
        //   io.emit("message", message); // Broadcast to all clients
        // });
        // Handle disconnection
        // socket.on("disconnect", () => {
        //   console.log(`${socket.id} disconnected`);
        // });
    });
    console.log("Socket.IO initialized");
};
exports.initializeSocket = initializeSocket;
