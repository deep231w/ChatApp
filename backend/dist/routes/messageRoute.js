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
const router = express_1.default.Router();
router.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reciverId, senderId, message } = req.body;
    if (!reciverId || !senderId || !message) {
        res.status(401).json("requier all fields ");
        return;
    }
    try {
        const result = yield db_1.default.message.create({
            data: {
                reciverId: parseInt(reciverId),
                userId: parseInt(senderId),
                sentId: parseInt(senderId),
                content: message
            }
        });
        console.log("Message created:", result);
        res.send(message);
    }
    catch (e) {
        console.log("message failed");
        res.status(500).json("message failed");
    }
}));
router.get("/:senderId/:reciverId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, reciverId } = req.params;
    if (!senderId || !reciverId) {
        res.status(400).json("Sender and Receiver IDs are required");
        return;
    }
    try {
        const result = yield db_1.default.message.findMany({
            where: {
                OR: [
                    { sentId: parseInt(senderId), reciverId: parseInt(reciverId) },
                    { sentId: parseInt(reciverId), reciverId: parseInt(senderId) },
                ],
            },
            orderBy: { createdAt: "asc" },
        });
        res.status(200).json(result);
    }
    catch (e) {
        console.error("Fetching message failed:", e);
        res.status(500).json("Error fetching messages");
    }
}));
exports.default = router;
