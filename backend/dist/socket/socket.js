"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const onlineusers = {};
const updateonlineUsers = () => {
    io.emit("online_users", Object.keys(onlineusers));
};
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
        socket.on("register", (userId) => {
            onlineusers[userId] = socket.id;
            console.log(`${userId} registered with socket ID ${socket.id}`);
        });
        socket.on("private_message", ({ senderId, reciverId, message }) => {
            const reciverSocketid = onlineusers[reciverId];
            if (reciverSocketid) {
                io.to(reciverSocketid).emit("recive_message", {
                    senderId,
                    message,
                });
            }
            else {
                console.log(`Recipient ${reciverId} is not online.`);
            }
            updateonlineUsers();
        });
        socket.on("disconnect", () => {
            for (const [userId, socketId] of Object.entries(onlineusers)) {
                if (socketId === socket.id) {
                    delete onlineusers[userId];
                    console.log(`${userId} disconnected`);
                    break;
                }
            }
            updateonlineUsers();
        });
    });
    console.log("Socket.IO initialized");
};
exports.initializeSocket = initializeSocket;
