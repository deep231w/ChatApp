import { useChat } from "@/hooks/useSocketChat";
import Modal from "@mui/material/Modal";
import EmojiPicker from "emoji-picker-react";
import { ArrowBigLeft, ArrowBigLeftIcon, ArrowLeftIcon, Loader2, LoaderCircle, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FiSmile } from "react-icons/fi";

type SelectedUser={
    firebaseuid:string | null
    firstName:string
    id:string | number
    lastName:string
}

type props={
    setSideBarOpen:React.Dispatch<React.SetStateAction<boolean>>
    selectedUser:SelectedUser
}
export default function ConversationSec({setSideBarOpen,selectedUser}:props){
    const { socketMessages, sendSocketMessage, loadingMessage } = useChat(selectedUser.id);
    const [inputMessage , setInputMessage]=useState("");
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const [loggedInUserId] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        return user.id;
    });
    const [messages, setMessages] = useState(socketMessages);

    useEffect(() => {
        setMessages(socketMessages);
    }, [socketMessages]);

    useEffect(()=>{
        console.log("messages  of user= ", selectedUser , socketMessages);
        
    },[socketMessages ,loadingMessage])

    const sendMessageFunction = () => {
        if(!inputMessage.trim()) return
        sendSocketMessage(inputMessage);
        setInputMessage("");
    };

    const onEmojiClick = (emojiData, event) => {
        setInputMessage((prev) => prev + emojiData.emoji);
    };
    return (
        <div
            className="relative flex flex-col justify-between h-screen ml-3 mr-3"
        >
            {/* <div
                className="absolute h-full w-full flex flex-col justify-between"
            > */}

                {/* top bar */}
                <div 
                    className="bg-gray-100 h-[70px] w-full rounded-b-xl flex items-center p-2 gap-2"
                >
                    {/* back arrow button */}
                    <button
                        className="md:hidden"
                        onClick={()=>setSideBarOpen(true)}
                    >
                        <ArrowLeftIcon/>
                    </button>
                    {/* avatar */}
                    <div
                        className="w-[40px] h-[40px] bg-gray-500 rounded-[50%]"
                    >

                    </div>
                    {/* user name */}
                    <div>
                        <h2
                            className="text-xl text-gray-700 text-bold"
                        >{selectedUser.firstName} {selectedUser.lastName}</h2>
                    </div>

                </div>

                {/* conversation */}

                {loadingMessage? 
                <div
                    className="flex justify-center items-center h-screen"
                >
                    <Loader2 className="w-12 h-12 animate-spin text-blue-800" />
                </div>:
                <div
                    className="flex flex-1 flex-col p-2 gap-3 overflow-y-auto"
                >
                    {messages.length > 0 ? (
                        messages.map((msg) => {
                            const isSentByLoggedInUser = msg.userId === loggedInUserId;

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${
                                        isSentByLoggedInUser
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`border p-2 rounded-lg w-auto max-w-xl break-words ${
                                            isSentByLoggedInUser
                                                ? "bg-white text-gray-700"
                                                : "bg-slate-800 text-gray-400"
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 text-center">
                            No messages yet...
                        </p>
                    )}
                </div>}

               if (!inputMessage.trim()) return;
 {/* Bottom bar */}
                <div
                    className="bg-gray-100 h-[70px] w-full rounded-t-xl flex flex-row p-3 gap-2"
                >
                    <input 
                        value={inputMessage}
                        onKeyDown={(e)=>{
                            if(e.key==='Enter'){
                                e.preventDefault()
                                sendMessageFunction()
                            }
                        }}
                        onChange={(e)=>setInputMessage(e.target.value)}
                        className="w-full rounded-xl bg-gray-300 text-black p-2 "
                        type="text"
                        placeholder="Type Message ....." 
                    />

                    <button
                        onClick={() => setShowPicker(!showPicker)}
                        
                        className="bg-yellow-300 hover:bg-yellow-200 text-gray-600 px-4 py-2 rounded-lg shadow-md"
                    >
                        <FiSmile size={24} />
                    </button>

                    <button
                        onClick={()=>sendMessageFunction()}
                        className="bg-blue-400 hover:bg-blue-300 text-gray-600 px-4 py-2 rounded-lg shadow-md"
                    >
                        <SendIcon/>
                    </button>
                </div>
            {/* </div> */}

            {showPicker && (
            <Modal
                open={showPicker}
                onClose={() => setShowPicker(false)}
            >
                <div
                    style={{
                    position: "absolute",
                    bottom: "80px",
                    right: "20px",
                    }}
                >
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
            </Modal>
            )}
        </div>
    )
}