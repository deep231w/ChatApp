"use strict";
// import jwt, { JwtPayload } from "jsonwebtoken";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db/db"));
const ProtectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(400).json("authentication error jwt token not found");
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        if (!decode) {
            res.status(400).json("middleware decode failed");
            return;
        }
        const user = yield db_1.default.user.findUnique({
            where: {
                id: parseInt(decode.userId)
            }
        });
        if (!user) {
            res.status(400).json("user not found");
            return;
        }
        req.user = user;
        next();
    }
    catch (e) {
        console.log("server error");
        res.status(500).json("server error");
    }
});
exports.default = ProtectRoute;
