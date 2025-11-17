//new
import { NextFunction, Request, Response } from "express";
import admin from "../firebaseAdmin/firebaseAdmin";
import jwt from "jsonwebtoken";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
       res.status(400).json({ message: "No token available" });
       return;
    }

    try {
      console.log("inside password based verification")
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as any).user = decoded;
       next();
       return;
    } catch (jwtError) {
      try {
        console.log("inside firebase token based verification")
        const decodedFirebase = await admin.auth().verifyIdToken(token);
        (req as any).user = decodedFirebase;
         next();
         return;
      } catch (firebaseError) {
         res.status(401).json({ message: "Invalid token" });
         return;
      }
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
     res.status(500).json({ message: "Server error" });
     return;
  }
};

export default authMiddleware;




//OLD 

// import { NextFunction, Request, Response } from "express";
// import admin from  "../firebaseAdmin/firebaseAdmin";

// const firebaseVerifyToken=async (req:Request, res:Response, next:NextFunction)=>{
//    try{ 
//     const authHeader= req.headers.authorization;


//     const token= authHeader?.split("Bearer ")[1];
    
//     if(!token){
//         res.status(400).send("no token available");
//         return;
//     }

//     const decode = await admin.auth().verifyIdToken(token);

//     ( req as any).user= decode;

//     next();
//     }catch(e){
//         res.status(500).send(e)
//         return;
//     }
// }
// export default firebaseVerifyToken;