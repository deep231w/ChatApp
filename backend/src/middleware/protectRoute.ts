// import jwt, { JwtPayload } from "jsonwebtoken";

// import { Request, Response, NextFunction } from "express";
// import prisma from "../db/db";

// interface DecodedToken extends JwtPayload {
// 	userId: string;
// }

// declare global {
// 	namespace Express {
// 		export interface Request {
// 			user: {
// 				id: string;
// 			};
// 		}
// 	}
// }

// const protectRoute = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
// 	try {
// 		const token = req.cookies.jwt;

// 		if (!token) {
// 			 res.status(401).json({ error: "Unauthorized - No token provided" });
// 			 return;
// 		}

// 		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

// 		if (!decoded) {
// 			 res.status(401).json({ error: "Unauthorized - Invalid Token" });
// 			 return;
// 		}

// 		const user = await prisma.user.findUnique({
// 			where: { id: decoded.userId },
// 			select: { id: true, username: true, fullName: true, profilePic: true },
// 		});

// 		if (!user) {
// 			 res.status(404).json({ error: "User not found" });
// 			 return;
// 		}

// 		req.user = user;

// 		next();
// 	} catch (error: any) {
// 		console.log("Error in protectRoute middleware", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };

// export default protectRoute;

import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/db";
import { User } from "@prisma/client";
interface DecodedToken extends JwtPayload{
    userId:string
} 
declare global{
namespace Express {
    		export interface Request {
     			user?:User
               	}
     	}
    }
const ProtectRoute= async(req:Request, res:Response, next:NextFunction)=>{
   try{ const token= req.cookies.jwt;

    if(!token){
        res.status(400).json("authentication error jwt token not found");
        return;

    }

    const decode= jwt.verify(token, process.env.JWT_TOKEN!) as DecodedToken
    if(!decode){
        res.status(400).json("middleware decode failed")
        return;

    }
    const user= await prisma.user.findUnique({
        where:{
            id:parseInt(decode.userId)
        }
    })

    if(!user){
        res.status(400).json("user not found")
        return;
    }

    req.user=user;
    next();
    }catch(e:any){
        console.log("server error");
        res.status(500).json("server error");
    }
}

export default ProtectRoute;