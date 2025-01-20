import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useAuth } from "../context/authContext";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import axios from "axios";
export const Chat = ({reciverId}:{reciverId:string}) => {
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const {currentUser}= useAuth();

  const handleSendMessage = () => {
    if (socket && message.trim()) {

      console.log("Sending message:", message);
      
      socket.emit("send_message", {
        senderId:currentUser?.uid,
        reciverId,
        message
      });
      setMessage(""); 
    }
  };

  useEffect(()=>{
    const fetchMessages= async()=>{
      try{
      const response = await axios.get(`http://localhost:3000/api/messges/${currentUser.uid}/${reciverId}`);
      setMessages(response.data);

      if(currentUser?.uid && reciverId){
        fetchMessages();
      }
    }catch(e){
      console.log("arror at chat.tsx ", e);
    }}
    
  }, [currentUser?.uid, reciverId])


  useEffect(() => {
    if (socket) {
      console.log("Socket connected:", socket.id);
     socket.on("message", (data: string) => {
        console.log("Message received:", data);

        setMessages(m=>[...m,data]);
      });

      
    }
    return () => {
      socket?.off("message");
    };
  }, [socket]);

  return (
    <>
      <div className="h-96 border rounded-md p-4 bg-gray-50 shadow-inner overflow-y-scroll">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <p key={index} className="p-2 bg-gray-100 rounded-md mb-2 shadow-sm">
              {msg}
            </p>
          ))
        ) : (
          <p className="text-gray-500 italic">No messages yet...</p>
        )}
      </div>
      <div className="mt-4 flex space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </>
  );
};
