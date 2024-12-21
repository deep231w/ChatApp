import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

let io: SocketServer; // Exportable Socket.IO instance for future use

export const initializeSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["POST", "GET"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle send_message event
    socket.on("send_message", (message) => {
      console.log("Backend message:", message);
      io.emit("message", message); // Broadcast to all clients
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
    });
  });

  console.log("Socket.IO initialized");
};

export { io };
