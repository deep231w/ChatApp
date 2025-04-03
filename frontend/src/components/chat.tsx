import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useUsersContext } from "../context/usersContext";
import { useChat } from "../hooks/useSocketChat";
import { useSelectedId } from "../context/selectedUserContext";
import DefaultBackground from "./ui/defaultBackground";

interface ChatProp{
  reciverId:string | null
  userName:string | null
}
export const Chat:React.FC<ChatProp> = ({reciverId,userName}) => {
  const { users, loggedinUser, loading } = useUsersContext() ?? {};
  const { selectedId } = useSelectedId();
  const { socketMessages, sendSocketMessage ,loadingMessage } = useChat(selectedId);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(()=>{
    if(!loadingMessage){
      console.log("fetch message iin chat component = ", socketMessages);
    }
  },[socketMessages])

    console.log("fetch message in chat.tsx componrnt= ", socketMessages);


  if (loading || !loggedinUser) {
    return <div>Loading chat...</div>;
  }
  const selectedUser = users.find(user => user.id == selectedId); 



  const sendMessageFunction = () => {
    sendSocketMessage(inputMessage);
    setInputMessage("");
  };
  console.log("selected userid in chat.tsx:",selectedId);
  return (
    <div>
        {selectedId? (<>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="border rounded-md bg-white text-blue-800 p-3 px-4 text-xl font-bold">
        {selectedId ? `${selectedUser.firstName}` : ''}
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-white shadow-inner border rounded-md">
        {socketMessages.length > 0 ? (
          socketMessages.map((msg) => (
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
      </>):(
        <DefaultBackground/>
      )}
    </div>
  );
};