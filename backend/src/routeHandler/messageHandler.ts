import express from  "express"; 
import fetchMessage from "../routes/messageRoute/fetchMessage";


const router= express.Router();


router.get("/:senderid/:reciverid",fetchMessage);

export default router; 