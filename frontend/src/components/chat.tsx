import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useAuth } from "../context/authContext";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import axios from "axios";

type Message = {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  sentId: number;
  reciverId: number;
  sender: {
    id: number;
    firebaseuid: string | null;
    firstName: string;
    lastName: string;
  };
};


export const Chat = ({ reciverId, userName }: { reciverId: string , userName:string}) => {
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message []>([]);
  const { currentUser } = useAuth();

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      console.log("Sending message:", message);

      socket.emit("send_message", {
        senderId: currentUser?.uid,
        reciverId,
        message,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/message/${currentUser.uid}/${reciverId}`
        );
        console.log("message", response.data);
        setMessages(response.data);
      } catch (e) {
        console.log("error at chat.tsx ", e);
      }
    };

    if (currentUser?.uid && reciverId) {
      fetchMessages();
    }
  }, [currentUser?.uid, reciverId]);

  useEffect(() => {
    if (socket) {
      console.log("Socket connected:", socket.id);
      socket.on(
        "message",
        (data: {
          id: number;
          content: string;
          createdAt: string;
          userId: number;
          sentId: number;
          reciverId: number;
        }) => {
          console.log("Message received:", data);
          //setMessages((prevMessages) => [...prevMessages, data]);
        }
      );
    }
    return () => {
      socket?.off("message");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
  {/* Messages Container */}
  <div>{userName}</div>
  <div className="flex-1 overflow-y-auto p-4 bg-white shadow-inner border rounded-md">
    {messages.length > 0 ? (
      messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 mb-2 rounded-lg shadow-sm max-w-xs ${
            msg.sender.firebaseuid === currentUser?.uid
              ? "bg-blue-500 text-white self-end ml-auto"
              : "bg-gray-200 text-black"
          }`}
        >
          {msg.content}
        </div>
      ))
    ) : (
      <p className="text-gray-500 italic">No messages yet...</p>
    )}
  </div>

  {/* Fixed Input Field (Now stays inside chat container) */}
  <div className="sticky bottom-0 left-0 w-full bg-white p-3 border-t flex items-center space-x-2">
    <Input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <Button
      onClick={handleSendMessage}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
    >
      Send
    </Button>
  </div>
</div>
  );
};
