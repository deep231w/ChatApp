import express, { Request, Response } from "express";
import useRoute from "./routes/userRoute"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors({
   origin: 'http://localhost:5173',
   methods:['POST','GET','DELETE','PUT'],
   credentials:true
}))
app.use("/api/user",useRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
