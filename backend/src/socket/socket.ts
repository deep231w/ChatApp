import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { object } from "zod";

let io: SocketServer; // Exportable Socket.IO instance for future use

export const initializeSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["POST", "GET"],
      credentials: true,
    },
  });
  interface OnlineUsers{
    [userid:string]:string;
  }
  const onlineusers:OnlineUsers={};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    //register socket id
    socket.on("register",(userId:string)=>{
        onlineusers[userId]=socket.id;
        console.log(`${userId}=${socket.id}`);
    })

    socket.on("private_message", ({senderId, reciverId, message})=>{
        const reciverSocketid=onlineusers[reciverId];
        if(reciverSocketid){
            io.to(reciverSocketid).emit("recive_message",{
                senderId,
                message
            })
        }
    })
    socket.on("disconnect",()=>{
        for(const [userId,socketId] of Object.entries(onlineusers)){
            if(socketId==socket.id){
                delete onlineusers[userId];
                console.log(`${userId} disconnected`)
                break;
            }
        }
    })
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

export { io };
