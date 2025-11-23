import { Request, Response } from "express";
import admin from "../../firebaseAdmin/firebaseAdmin";
import prisma from "../../db/db";
import cookie from "cookie"
import jwt from "jsonwebtoken";

const LoginWithGoogle= async (req:Request, res:Response)=>{
    try{
        const authHeader= req.headers.authorization;

        console.log("auth header in signin route=====", authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(400).send("No token found");
            return ;
        }

        const idToken= authHeader.split("Bearer ")[1];

        const decodedToken= await admin.auth().verifyIdToken(idToken);
        console.log("decode token in signin route= ", decodedToken)



        const { email, uid, name } = decodedToken;

        if (!email) {
            return res.status(400).json({ message: "Email not found in token" });
        }

        // Split name safely
        const [firstName = "", lastName = ""] = (name || "").split(" ");



        let user= await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        console.log("user - - -", user)

        if (!user) {
            user=await  prisma.user.create({
                data:{
                    firebaseuid:decodedToken.uid,
                    firstName,
                    lastName,
                    email
                }
            })
        }
        
        console.log("user in signin = ", user);


        const userPayload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };

        console.log('payload in google signin - ', userPayload)

        const token = jwt.sign(userPayload, process.env.JWT_SECRET!, {
            expiresIn: "7d"
        });
        console.log("jwt token= ", token);
        
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        

        res.status(200).json({
            message:"loggedin successfull!! ",
            user
        })
        return;

    }catch(e){
        console.log("fronted might down",e);
        res.status(500).send("server error");
    }
}

export default LoginWithGoogle ;