"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("../db/db"));
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
        socket.on("private_message", (_a) => __awaiter(void 0, [_a], void 0, function* ({ sentId, reciverId, content }) {
            const reciverSocketid = onlineusers[reciverId];
            console.log("all ids ", sentId, reciverId, content);
            try {
                const savedMessage = yield db_1.default.message.create({
                    data: {
                        content,
                        userId: sentId, // Assign userId properly
                        sentId,
                        reciverId,
                    },
                    include: {
                        sender: true,
                        reciver: true
                    }
                });
                console.log("message was sent", savedMessage);
                if (reciverSocketid) {
                    io.to(reciverSocketid).emit("recive_message", savedMessage);
                }
                else {
                    console.log(`Recipient ${reciverId} is not online.`);
                }
            }
            catch (e) {
                console.log("error in socket.ts", e);
            }
        }));
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
