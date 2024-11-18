import jwt from "jsonwebtoken"
import { Response } from "express"
import { strict } from "assert"


const generateToken=async(userId:string, res:Response)=>{
        const token =  jwt.sign({userId}, process.env.JWT_SECRET || "")

        res.cookie("jwt",token, {
            maxAge:15 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "devlopment"

        })
        return token;
} 

export default generateToken;