import { Request, Response } from "express";
import z from "zod"
import prisma from "../../db/db";



const fetchMessage= async(req:Request, res:Response)=>{
    const {senderId, reciverId}= req.params;

    if(!senderId || reciverId){
        res.status(300).send("incorect request");
        return;
    }

    try{
        const user= await prisma.user.findFirst({
            where:{
                firebaseuid:senderId
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