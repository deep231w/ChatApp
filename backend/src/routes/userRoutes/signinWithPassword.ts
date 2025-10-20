import { Request, Response } from "express";
import prisma from "../../db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface SignInPasswordBody {
  email: string;
  password: string;
}

const SignInWithPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as SignInPasswordBody;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
        res.status(404).json({ message: "User does not exist" });
        return;
    }

    if (!existingUser.password) {
        res.status(400).json({
        message: "This account was registered via Google. Please sign in using Google.",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token:token,
      user: {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
      },
    });
    return;
    
  } catch (e) {
    console.error("Error during signin:", e);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export default SignInWithPassword;
