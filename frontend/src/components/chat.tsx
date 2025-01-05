import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useAuth } from "../context/authContext";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
export const Chat = () => {
  const { socket } = useSocket();
  const [reciverId, setReciverId]=useState("");
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
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div>
        <Input
          type="text"
          placeholder="Type Message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </>
  );
};
