import { useEffect, useState } from "react";
import { useSelectedId } from "../context/selectedUserContext"
import axios from "axios";
import { useAuth } from "../context/authContext";

interface MessageType{
    id: string;
    content: string;
    createdAt: string;
    userId: number;
    sentId: number;
    reciverId: number;
}
export const useMessage =()=>{
    const {currentUser,loading,token}= useAuth();
    const { selectedId } = useSelectedId();
    const [messages, setMessages]= useState<MessageType[]| undefined>(undefined);
    const [messageLoading, setMessageLoading]=useState(true);
    const [messageError, setMessageError]= useState<string|null>(null);

    useEffect(()=>{
        async function FetchMessages (){
            if (!selectedId || !currentUser?.uid) return;
            try{const res= await axios.get(`http://localhost:3000/api/message/${currentUser?.uid}/${selectedId}`,{
                headers:{Authorization:`Bearer ${token}`},
                withCredentials:true
            })
                setMessages(res.data);
                setMessageLoading(false);
            }catch(e){
                console.log("error during message fetch ",  e);
                setMessageError("error during message fetch ")
            }finally{
                setMessageLoading(false);
            }
        }
        if(currentUser){
            FetchMessages()
        }
    },[selectedId, currentUser?.uid])

    return {messages, messageLoading,messageError}

}