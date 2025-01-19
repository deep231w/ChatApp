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

router.get("/:userid/:reciverId",async(req:Request, res:Response)=>{
        const {reciverId}=req.params;
        const senderId= req.user?.id;

        try{
            const result= await prisma.message.findMany({
                where:{
                    OR:[
                        {sentId:senderId, reciverId:parseInt(reciverId)},
                        {sentId:parseInt(reciverId), reciverId:senderId}
                    ],
                   
                },
                orderBy: { createdAt: "asc" },
            }) 
            res.status(200).json(result);
        }catch(e){
            console.log("fetching message failed");
            res.status(500).json("message sending failed ! probably server issue");
        }
})

 export default router;