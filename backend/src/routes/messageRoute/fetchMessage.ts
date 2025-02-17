import { Request, Response } from "express";
import prisma from "../../db/db";



const fetchMessage= async(req:Request, res:Response)=>{
    const {senderid, reciverid}= req.params;

    console.log("senderId in fetch message route= ", senderid);
    console.log("reciverId in fetch message route=", reciverid);
    
    if(!senderid || !reciverid){
        res.status(300).send("incorect request");
        return;
    }

    try{
        const user= await prisma.user.findFirst({
            where:{
                id:parseInt(senderid)
            }
        })

        if(!user){
            res.status(300).send("no user found ")
            return;
        }

        const result = await prisma.message.findMany({
            where: {
              OR: [
                { sentId: user?.id, reciverId: parseInt(reciverid) },
                { sentId: parseInt(reciverid), reciverId: user?.id },
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