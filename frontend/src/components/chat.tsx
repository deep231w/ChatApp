import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useMessage } from "../hooks/useMessage";
import { useUsersContext } from "../context/usersContext";
import { useChat } from "../hooks/useSocketChat";
import { useSelectedId } from "../context/selectedUserContext";

export const Chat = () => {
  const {messages, messageError,messageLoading}=useMessage();
  const {users}=useUsersContext();
  const {selectedId} = useSelectedId();
  const {socketMessages, sendSocketMessage}= useChat(selectedId);

  const [inputMessage, setInputMessage]= useState<string>("");



  if(messageError) return <p>server Error !!</p>
  if(messageLoading) return <p>Message loading keep wait !!...</p>
  if(!messages) return <p>No messages . . . Start chatting</p>

  const sendMessageFunction =()=>{

    sendSocketMessage(inputMessage,selectedId);
    setInputMessage("");
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
  <div className="border rounded-md bg-white text-blue-800 p-3 px-4 text-xl font-bold">{}</div>
  <div className="flex-1 overflow-y-auto p-4 bg-white shadow-inner border rounded-md">
    {messages.length > 0 ? (
      messages.map((msg) => (
        <div key={msg.id}>
            {msg.content}
        </div>
      ))
    ) : (
      <p className="text-gray-500 italic">No messages yet...</p>
    )}
  </div>

  <div className="sticky bottom-0 left-0 w-full bg-white p-3 border-t flex items-center space-x-2">
    <Input
      type="text"
      placeholder="Type a message..."
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
      className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <Button
      onClick={sendMessageFunction}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
    >
      Send
    </Button>
  </div>
</div>
  );
};