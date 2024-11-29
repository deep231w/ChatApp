import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";

export const Chat = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      console.log("Sending message:", message);
      socket.emit("send_message", message);
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
        <input
          type="text"
          placeholder="Type Message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  );
};
