import { Request, Response } from "express";
import prisma from "../../db/db";



const fetchMessage= async(req:Request, res:Response)=>{
    const {senderId, reciverId}= req.params;
    console.log("senderId in fetch message route= ", senderId);
    console.log("reciverId in fetch message route=", reciverId);
    
    if(!senderId || !reciverId){
        res.status(300).send("incorect request");
        return;
    }

    try{
        const user= await prisma.user.findFirst({
            where:{
                id:parseInt(senderId)
            }
        })

        if(!user){
            res.status(300).send("no user found ")
            return;
        }

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
          res.status(200).send(result);

    }catch(e){
        console.log("server error", e);
        res.status(500).send("server error during user fetching ");
    }

}

export default fetchMessage ;