import { Request, Response } from "express";
import prisma from "../../db/db";


const SendMessage= async(req:Request, res:Response)=>{
    try{const {senderId, reciverId, message}= req.body;
    console.log("credentials= ",senderId,reciverId,message)
    if(!senderId && !reciverId && !message){
        res.status(400).send("invalid credentials try again !!")
        return; 
    }

    const response= await prisma.message.create({
        data:{
            sentId:parseInt(senderId),
            userId:parseInt(senderId),
            reciverId:parseInt(reciverId),
            content:message,
        }
    })

    console.log(response);
    res.status(200).json({
        message:"sent message successfully",
        response
    })
    return ;
    
    }catch(e){
        console.log("server error at send message route = ",e);
        res.status(500).send("server error at send message route !!");
    }
}

export default SendMessage;