import { Request, Response } from "express";
import admin from "../../firebaseAdmin/firebaseAdmin";
import prisma from "../../db/db";
import cookie from "cookie"
import jwt from "jsonwebtoken";

const Signin= async (req:Request, res:Response)=>{
    try{
        const authHeader= req.headers.authorization;

        console.log("auth header in signin route", authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(400).send("No token found");
            return ;
        }

        const idToken= authHeader.split("Bearer ")[1];

        const decodedToken= await admin.auth().verifyIdToken(idToken);
        console.log("decode token in signin route= ", decodedToken)
        const {email}= decodedToken;
        console.log("email in signin route", email);

        const user= await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log("user in signin = ", user);


        const userPayload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };

        const token = jwt.sign(userPayload, process.env.JWT_SECRET!, {
            expiresIn: "7d"
        });
        console.log("jwt token= ", token);
        // res.setHeader("Set-Cookie", cookie.serialize("authToken", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production", // Secure in production
        //     sameSite: "strict",
        //     maxAge: 60 * 60 * 24 * 7, // 7 days
        //     path: "/"
        // }));
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        

        res.status(200).json({
            message:"loggedin successfull!! ",
            user:{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        })
        return;

    }catch(e){
        console.log("fronted might down",e);
        res.status(500).send("server error");
    }
}

export default Signin ;