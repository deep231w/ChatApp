import { Request, Response } from "express";
import admin from "../../firebaseAdmin/firebaseAdmin";
import { z } from "zod";
import prisma from "../../db/db";
import cookie from "cookie"
const signInBody= z.object({
    email: z.string().email(),
    firebaseuid: z.string()
})

const Signin= async (req:Request, res:Response)=>{
    try{
        const authHeader= req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(400).send("No token found");
            return ;
        }

        const idToken= authHeader.split("Bearer ")[1];

        const decodedToken= await admin.auth().verifyIdToken(idToken);
        const {uid, email}= decodedToken;

        const userDetails= await prisma.user.findUnique({
            where:{
                firebaseuid:uid
            }
        })

        res.setHeader("Set-cookie", cookie.serialize("token",idToken,{
            httpOnly:true,
            maxAge:60*60*24*7,
            sameSite:"strict",
            path:"/"
        }))
        res.status(200).json({
            message:"loggedin successfull!! ",
            userDetails
        })


    }catch(e){
        console.log("fronted might down");
        res.status(500).send("server error");
    }
}

export default Signin ;