"use strict";
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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db/db"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
const signupBody = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().optional(),
    firebaseuid: zod_1.z.string().optional(),
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = signupBody.safeParse(req.body);
    console.log(result);
    if (!result.success) {
        res.status(400).json({
            error: "Invalid input: " + result.error.issues.map((issue) => issue.message).join(", "),
        });
        return;
    }
    const { firstName, lastName, email, password, firebaseuid } = result.data;
    const user = yield db_1.default.user.findFirst({
        where: { email: email }
    });
    if (!password) {
        res.send("please enter password");
        return;
    }
    if (user) {
        console.log("user alredy exist");
        res.send("user alredy exist");
        return;
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield db_1.default.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                firebaseuid
            },
        });
        const userId = user.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || "");
        res.status(201).json({
            message: "Signup successful",
            token: token
        });
        console.log("successfully signup");
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "An error occurred during signup" });
    }
}));
const signinBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = signinBody.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: "Invalid input: " + result.error.issues.map((issue) => issue.message).join(", "),
        });
        return;
    }
    const { email, password } = result.data;
    if (!password) {
        res.send("enter password");
        return;
    }
    try {
        const user = yield db_1.default.user.findUnique({
            where: { email: email }
        });
        if (!user) {
            res.send("user not found");
            return;
        }
        if (!user.password) {
            res.send("please enter password");
            return;
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        const userId = user === null || user === void 0 ? void 0 : user.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || "");
        res.status(2001).json({
            message: "login successfull",
            token: token
        });
    }
    catch (e) {
        console.log("error", e);
        res.status(500).send("server error");
    }
}));
//fetch all user details
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.default.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });
        res.status(200).json(users);
    }
    catch (e) {
        console.log("error in api/user route ", e);
        res.status(500).send("Server error  at api/user");
    }
}));
exports.default = router;
