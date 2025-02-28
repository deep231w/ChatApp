import {  Request, Response } from "express";
import admin from "../../firebaseAdmin/firebaseAdmin";
import prisma from "../../db/db";
import jwt from "jsonwebtoken";
const signUp= async (req:Request, res:Response)=>{

    try{
    const authToken= req.headers.authorization;

    if(!authToken){
        res.status(400).send("no token recived");
        return;
    }

    const actualToken= authToken.split("Bearer ")[1];

    if(!actualToken){
        res.status(400).send("no token available");
        return; 
    }

    const tokenId= await admin.auth().verifyIdToken(actualToken);
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
    const userPayload= {
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
    }
    const token= jwt.sign(userPayload, process.env.JWT_SECRET!);

    res.cookie("userData",token,{
        httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
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