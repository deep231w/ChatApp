import {  Request, Response } from "express";
import admin from "../../firebaseAdmin/firebaseAdmin";
import prisma from "../../db/db";

const signUp= async (req:Request, res:Response)=>{

    try{
    const authToken= req.headers.authorization;

    if(!authToken){
        res.status(400).send("no token recived");
        return;
    }

    const token= authToken.split("Bearer ")[1];

    if(!token){
        res.status(400).send("no token available");
        return; 
    }

    const tokenId= await admin.auth().verifyIdToken(token);
    const {uid, email, firstName, lastName}= tokenId;

    if(!email){
        res.status(400).send("incorrect credentials");
        return;
    }

    let user= await prisma.user.findFirst({
        where:{
            email:email
        }
    })

    if(!user){
        user= await prisma.user.create({
            data:{
                firebaseuid:uid,
                email:email,
                firstName,
                lastName
            }
        })
    }
    res.cookie("userData",JSON.stringify({
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
    }),{
        httpOnly:false,
        sameSite:"strict"
    })

    res.status(200).json({
        token:token,
        user
    })
    
}catch(e){
        console.log("server error at signup Route", e);
        res.status(500).send("server error");
    }

    
}