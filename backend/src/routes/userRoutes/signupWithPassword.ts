import { Request, Response } from "express";
import prisma from "../../db/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

interface PasswordSignupBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


const passwordSignUp= async(req:Request, res:Response)=>{
    try{
        const {firstName, lastName, email, password}=req.body as PasswordSignupBody;

        const existingUser =await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(existingUser){
            if(existingUser.authType==='GOOGLE'){
                 res.status(404).json({
                    message:"This email is already registered via Google. Please sign in using Google instead or SignUp with another email"
                })
            }
            else{
                 res.status(409).json({
                    message:"user already exist please try with another email."
                })
            }
            return;
        }

        const hashedPassword=await bcrypt.hash(password, 10)

        const newUser= await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password:hashedPassword,
                authType:'PASSWORD'
            }
        })
        
        const token= jwt.sign(
            {id:newUser.id, firstName:newUser.firstName , lastName:newUser.lastName, email:newUser.email},
            process.env.JWT_SECRET!,{expiresIn:'7d'}
        )
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }
        });
        return;

    }catch(e){
        console.log("error during password signup- ", e);
         res.status(500).json({
            message:"server error !",
            error:e
        })
        return;
    }
}

export default passwordSignUp;