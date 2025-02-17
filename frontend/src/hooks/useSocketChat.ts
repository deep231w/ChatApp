import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useUsersContext } from "../context/usersContext";
import { useAuth } from "../context/authContext";
import axios from "axios";

interface Message {
    id?: string;
    content: string;
    createdAt?: string;
    userId: number;
    sentId: number;
    reciverId: number;
}

export const useChat = (reciverId: string) => {
  const { socket } = useSocket();
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);
  const { loggedinUser, loading } = useUsersContext() ?? {};
  const {localstorageUser, token}=useAuth();
  const [loadingMessage, setLoadingMessage]= useState<boolean>(true);
  
  useEffect(()=>{
                console.log("localstorege value in usesocket message hook- ", localstorageUser);
              },[localstorageUser])
  
  
 useEffect(()=>{
    
      async function fetchMessage () {

        try{ 
              
              if(!reciverId || !localstorageUser.id){
                  console.log("invalid credentials,  try again! / user unavailable !!")
                  return;
                }

              const res= await axios.get(`http://localhost:3000/api/message/${localstorageUser.id}/${reciverId}`,{
                headers:{Authorization:`Bearer ${token}`},
                withCredentials:true
              })

              console.log("fetch messages in usesocket hook= ", res.data);
              setSocketMessages(res.data);
              setLoadingMessage(false);
      }catch(e){

      console.log("error during message fetching in useSocketMessage hook- ", e);
      return;
    }}
    fetchMessage();

}, [reciverId]);

  useEffect(() => {
    if (!socket) return;

    const messageListener = (newMessage: Message) => {
      setSocketMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receive_message", messageListener);

    return () => {
      socket.off("receive_message", messageListener);
    };
  }, [socket]);

  const sendSocketMessage = async (content: string) => {
    if (loading || !loggedinUser) {
      console.warn("User not available yet!");
      return;
    }
    console.log("loggedinUser in sendSocketMessage", loggedinUser); // Debugging

    const sentId = localstorageUser.id;
    
    if (socket && content.trim() !== "") {
      const newMessage= {
        id: `${Date.now()}-${Math.random()}`,
        content,
        sentId:Number(sentId),
        userId:Number(sentId),
        reciverId:Number(reciverId)
      }
      console.log("Sending message:", newMessage); // Debugging

      socket.emit("private_message", {
        newMessage
      });


      setSocketMessages((prev) => [...prev, newMessage]);
    }
  };

  return { socketMessages, sendSocketMessage ,loadingMessage};
};
