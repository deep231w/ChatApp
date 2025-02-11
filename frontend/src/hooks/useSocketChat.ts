import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";

interface Message {
  sentId: string;
  content: string;
}

export const useChat = (reciverId: string) => {
  const { socket } = useSocket();
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);

  console.log("in socket chat context ");
  const sendSocketMessage = (content: string, sentId: string) => {
    console.log("Inside sendSocketMessage");
  console.log("Sender ID (sentId):", sentId);
  console.log("Receiver ID (reciverId):", reciverId);
  console.log("Message Content:", content);

  
    console.log("inside socket message ");
    if (socket && content.trim() !== "") {
      console.log("all ids = ", sentId,reciverId, content)
      
      socket.emit("private_message", { sentId, reciverId, content });
      setSocketMessages((prev) => [...prev, { sentId, content }]); 
    }
  };

  useEffect(() => {
    console.log("inside useEffect ");
    if (socket) {
      console.log("inside useEffect/if condition");

      const messageListener = (newMessage: Message) => {
        console.log("New message received:", newMessage);
        setSocketMessages((prev) => [...prev, newMessage]);
      };

      socket.on("receive_message", messageListener);

      return () => {
        socket.off("receive_message", messageListener);
      };
    }
  }, [socket]);

  return { socketMessages, sendSocketMessage };
};
