import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import prisma from "../db/db";
import { error } from "console";
let io: SocketServer;

interface OnlineUsers {
  [userId: string]: string;
}

const onlineusers: OnlineUsers={};

interface PrivateMessage {
  sentId: number;
  reciverId: number;
  content: string;
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
  io.use((socket,next)=>{
    const userId= socket.handshake.auth?.userId;
    if(!userId){
      console.log("unauthorised connection attempt")
      return next (new Error ("Authentication Error"))

    }
    next();
  })
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("register", (userId: number) => {
      onlineusers[userId] = socket.id;
      console.log(`${userId} registered with socket ID ${socket.id}`);
      console.log("Current online users:", onlineusers);
      updateonlineUsers();
    });

    socket.on("private_message", async ({ sentId, reciverId, content }: PrivateMessage) => {
      const reciverSocketid = onlineusers[reciverId];
      console.log("all ids ", sentId,reciverId,content);
    try{

        const savedMessage= await prisma.message.create({
          data:{
            content,
            userId: sentId, // Assign userId properly
            sentId,
            reciverId,

          },
          include: {
            sender: true,
            reciver: true
          }
        
        })
        console.log("message was sent",savedMessage );
        if (reciverSocketid) {
            io.to(reciverSocketid).emit("receive_message", savedMessage);
            console.log("real time recieve message = ", savedMessage);
            } else {
                  console.log(`Recipient ${reciverId} is not online.`);
            }
        }catch(e){
          console.log("error in socket.ts", e);
        }

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
