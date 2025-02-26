import express from  "express"; 
import fetchMessage from "../routes/messageRoute/fetchMessage";
import SendMessage from "../routes/messageRoute/sendMessage";


const router= express.Router();


router.get("/:senderid/:reciverid",fetchMessage);

router.post("/send",SendMessage);

export default router; 