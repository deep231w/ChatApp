import express, { Request, Response } from "express";
import prisma from "../db/db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

const signupBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    firebaseuid: z.string().optional(),
});

// Infer the schema type
type SignupBody = z.infer<typeof signupBody>;

router.post("/signup",async (req: Request<{}, {}, SignupBody>, res: Response): Promise<void> => {
        const result = signupBody.safeParse(req.body);
        console.log(result);
        if (!result.success) {
            res.status(400).json({
                error: "Invalid input: " + result.error.issues.map((issue) => issue.message).join(", "),
            });
            return;
        }

        const { firstName, lastName, email, password,firebaseuid } = result.data;
        const user= await prisma.user.findFirst({
            where:{email:email}
        })
        if(!password){
            res.send("please enter password");
            return;
        }
        if (user){
            console.log("user alredy exist");
             res.send("user alredy exist");
             return;
        }
       
        try { 
            const hashedPassword= await bcrypt.hash(password, 10)
            const user= await prisma.user.create({
                data: { 
                    firstName, 
                    lastName, 
                    email, 
                    password:hashedPassword,
                    firebaseuid 
                },
            });
            const userId= user.id
            const token= jwt.sign({userId}, process.env.JWT_SECRET || "");

            res.status(201).json({ 
                message: "Signup successful" ,
                token:token
                });
            console.log("successfully signup")
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ error: "An error occurred during signup" });
        }
    }
);

const signinBody=z.object({
    email:z.string().email(),
    password:z.string()
})

router.post("/signin",async(req:Request,res:Response)=>{
    const result=signinBody.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            error: "Invalid input: " + result.error.issues.map((issue) => issue.message).join(", "),
        });
        return;
    }

    const {email,password}=result.data;

    if(!password){
        res.send("enter password");
        return;
    }

    try{
        const user=await prisma.user.findUnique({
            where:{email:email}
        })

        if(!user){
            res.send("user not found")
            return;
        }
        if(!user.password){
            res.send("please enter password");
            return;
        }
        const isPasswordCorrect= await bcrypt.compare(password, user.password)
        const userId=user?.id;

        const token= jwt.sign({userId}, process.env.JWT_SECRET || "");
        
        res.status(2001).json({
            message:"login successfull",
            token:token
        })
    }catch(e){
        console.log("error",e);
        res.status(500).send("server error");
    }
})
export default router;
