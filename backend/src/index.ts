import express, { Request, Response } from "express";
import useRoute from "./routes/userRoute"
import messageRoutr from "./routes/messageRoute"
import cors from "cors"
import { createServer } from "http";
import {Server} from "socket.io";

const app = express();
app.use(express.json());
app.use(messageRoutr);

const server= createServer(app);
const io=new Server(server,{
  cors:{
    origin:'http://localhost:5173',
    methods:['POST','GET'],
    credentials:true
  }
});
app.use(cors({
   origin: 'http://localhost:5173',
   methods:['POST','GET','DELETE','PUT'],
   credentials:true
}))


io.on("connection", (socket)=>{
    console.log("user connected", socket.id);

    socket.on("send_message",(message)=>{
      console.log("backend message", message)
      io.emit("message", message);
    })
    
    socket.on("disconnect",()=>{
      console.log(`${socket.id} is disconnected`);

    })

})

app.use("/api/user",useRoute);
app.use("/message", messageRoutr);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
