import { Request, Response } from "express";
import admin from "../../firebaseAdmin/firebaseAdmin";
import prisma from "../../db/db";
import cookie from "cookie"


const Signin= async (req:Request, res:Response)=>{
    try{
        const authHeader= req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(400).send("No token found");
            return ;
        }

        const idToken= authHeader.split("Bearer ")[1];

        const decodedToken= await admin.auth().verifyIdToken(idToken);
        const {email}= decodedToken;

        const user= await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        res.setHeader("Set-cookie", cookie.serialize("token",idToken,{
            httpOnly:true,
            maxAge:60*60*24*7,
            sameSite:"strict",
            path:"/"
        }))
        res.cookie("userData",JSON.stringify({
            email:user?.email,
            firstName:user?.firstName,
            lastName:user?.lastName,
            id:user?.id
        }))

        res.status(200).json({
            message:"loggedin successfull!! ",
            user,
            token:idToken
        })


    }catch(e){
        console.log("fronted might down");
        res.status(500).send("server error");
    }
}

export default Signin ;