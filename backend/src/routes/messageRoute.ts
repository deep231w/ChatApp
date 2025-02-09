import express,{Request, Response} from "express";
import prisma from "../db/db";

const router= express.Router();


router.post("/send", async(req:Request, res:Response)=>{
    const {reciverId, senderId, message}= req.body;
    if(!reciverId || !senderId || !message){
         res.status(401).json("requier all fields ")
         return;
    }

    try{
        const result =await prisma.message.create({
         data:{
            reciverId:parseInt(reciverId),
            userId:parseInt(senderId),
            sentId:parseInt(senderId),
            content:message       
         }   
        })
        console.log("Message created:", result);

        res.send(message);
    }catch(e){
        console.log("message failed");
        res.status(500).json("message failed")
    }
})

router.get("/:senderId/:reciverId", async (req: Request, res: Response) => {
    const { senderId, reciverId } = req.params;
  
    if (!senderId || !reciverId) {
      res.status(400).json("Sender and Receiver IDs are required");
      return;
    }
  
    try {
      const user= await prisma.user.findFirst({
        where:{
          firebaseuid:senderId
        }
      })

      const result = await prisma.message.findMany({
        where: {
          OR: [
            { sentId: user?.id, reciverId: parseInt(reciverId) },
            { sentId: parseInt(reciverId), reciverId: user?.id },
          ],
        },
        orderBy: { createdAt: "asc" },
        include:{
          sender:true
        },
      });
  
      res.status(200).json(result);
    } catch (e) {
      console.error("Fetching message failed:", e);
      res.status(500).json("Error fetching messages");
    }
  });
  
 export default router;