import { NextFunction, Request, Response } from "express";
import admin from  "../firebaseAdmin/firebaseAdmin";

const firebaseVerifyToken=async (req:Request, res:Response, next:NextFunction)=>{
   try{ 
    const authHeader= req.headers.authorization;

    console.log("token in middleware = ", authHeader);

    const token= authHeader?.split("Bearer ")[1];
    console.log("actual token after remove the Bearer= ", token);
    
    if(!token){
        res.status(400).send("no token available");
        return;
    }

    const decode = await admin.auth().verifyIdToken(token);

    ( req as any).user= decode;

    next();
    }catch(e){
        res.status(500).send(e)
        return;
    }
}
export default firebaseVerifyToken;