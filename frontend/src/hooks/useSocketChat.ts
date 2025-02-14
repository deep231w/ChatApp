import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { useUsersContext } from "../context/usersContext";

interface Message {
  //sentId: string;
  content: string;
}

export const useChat = (receiverId: string) => {
  const { socket } = useSocket();
  const [socketMessages, setSocketMessages] = useState<Message[]>([]);
  const { loggedinUser, loading } = useUsersContext() ?? {};

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

  const sendSocketMessage = (content: string) => {
    if (loading || !loggedinUser) {
      console.warn("User not available yet!");
      return;
    }

    const sentId = loggedinUser.id;

    if (socket && content.trim() !== "") {
      socket.emit("private_message", { sentId, receiverId, content });
      setSocketMessages((prev) => [...prev, { content }]);
    }
  };

  return { socketMessages, sendSocketMessage };
};
