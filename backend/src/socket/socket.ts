import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

let io: SocketServer;

interface OnlineUsers {
  [userId: string]: string;
}

const onlineusers: OnlineUsers={};
interface PrivateMessage {
  senderId: string;
  reciverId: string;
  message: string;
}

const updateonlineUsers= ()=>{
  io.emit("online_users", Object.keys(onlineusers))
}

export const initializeSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["POST", "GET"],
      credentials: true,
    },
  });

  const onlineusers: OnlineUsers = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId: string) => {
      onlineusers[userId] = socket.id;
      console.log(`${userId} registered with socket ID ${socket.id}`);
    });

    socket.on("private_message", ({ senderId, reciverId, message }: PrivateMessage) => {
      const reciverSocketid = onlineusers[reciverId];
      if (reciverSocketid) {
        io.to(reciverSocketid).emit("recive_message", {
          senderId,
          message,
        });
      } else {
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

export { io };
