import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useUsersContext } from "../context/usersContext";
import { useChat } from "../hooks/useSocketChat";
import { useSelectedId } from "../context/selectedUserContext";
import DefaultBackground from "./defaultBackground/DefaultBackground";
import { FiSmile } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";


interface ChatProp {
  reciverId: string | null;
  userName: string | null;
}

export const Chat: React.FC<ChatProp> = ({ reciverId, userName }) => {
  const { users, loggedinUser, loading } = useUsersContext() ?? {};
  const { selectedId } = useSelectedId();
  const { socketMessages, sendSocketMessage, loadingMessage } = useChat(selectedId);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);


  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const loggedInUserId = parsedUser?.id;

  // Called when an emoji is clicked
  const onEmojiClick = (emojiData, event) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    if (!loadingMessage) {
      console.log("fetch message in chat component = ", socketMessages);
    }
  }, [socketMessages]);

  if (loading || !loggedinUser) {
    return <div>Loading chat...</div>;
  }

  const selectedUser = users.find((user) => user.id == selectedId);

  const sendMessageFunction = () => {
    sendSocketMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <div >
      {selectedId ? (
        <>
          <div className="flex flex-col h-screen bg-gray-100 rounded-2xl shadow-lg">
            {/* Chat Header */}
            <div className="border rounded-md bg-white text-blue-800 p-3 px-4 text-xl font-bold">
              {selectedId ? `${selectedUser.firstName}` : ""}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-white shadow-inner border rounded-md space-y-2">
              {socketMessages.length > 0 ? (
                socketMessages.map((msg) => {
                  const isSentByLoggedInUser = msg.userId === loggedInUserId;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isSentByLoggedInUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                          isSentByLoggedInUser
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 italic text-center">No messages yet...</p>
              )}
            </div>

            {/* Input Box */}
            <div className="sticky bottom-0 left-0 w-full bg-white p-3 border-t flex items-center space-x-2 rounded-2xl">
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={() => setShowPicker(!showPicker)}
                className="bg-gray-100 hover:bg-gray-200 text-white px-4 py-2 rounded-lg shadow-md"
              >
                <FiSmile size={24} color="black"/>
              </Button>
              <Button
                onClick={sendMessageFunction}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
              >
                Send
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <DefaultBackground />
        </div>
        
      )}

      {/* Emoji picker popup */}
      {showPicker && (
        <div 
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",      
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}

        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};
