import express, { Request, Response } from "express";
import prisma from "../../db/db";


const allUsers= async (req:Request, res:Response)=>{
    try{
        const response= await prisma.user.findMany({
            select:{
                id:true,
                firstName:true,
                lastName:true,
                firebaseuid:true,
            }
        })

        res.status(200).send(response);

    }catch(e){
        console.log("server error " ,e);
        res.status(500).send("server error");
    }
}

export default allUsers; 