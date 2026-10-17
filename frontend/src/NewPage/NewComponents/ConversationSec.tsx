import { useChat } from "@/hooks/useSocketChat";
import Modal from "@mui/material/Modal";
import EmojiPicker from "emoji-picker-react";
import { ArrowLeftIcon, Loader2, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FiSmile } from "react-icons/fi";

type SelectedUser = {
    firebaseuid: string | null
    firstName: string
    id: string | number
    lastName: string
}

type props = {
    setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedUser: SelectedUser
}

export default function ConversationSec({ setSideBarOpen, selectedUser }: props) {
    const { socketMessages, sendSocketMessage, loadingMessage } = useChat(selectedUser.id)
    const [inputMessage, setInputMessage] = useState("")
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const [loggedInUserId] = useState(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        return user.id
    })
    const [messages, setMessages] = useState(socketMessages)

    useEffect(() => {
        setMessages(socketMessages)
    }, [socketMessages])

    const sendMessageFunction = () => {
        if (!inputMessage.trim()) return
        sendSocketMessage(inputMessage)
        setInputMessage("")
    }

    const onEmojiClick = (emojiData: any) => {
        setInputMessage((prev) => prev + emojiData.emoji)
    }

    return (
        <div className="flex h-full flex-col bg-[#f7f7f7]">
            <header className="flex items-center gap-3 border-b border-[#e5e7eb] bg-[#fbfbfb] px-4 py-3 md:px-5">
                <button
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#dfe4ea] bg-white text-slate-700 md:hidden"
                    onClick={() => setSideBarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <ArrowLeftIcon size={18} />
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfe4ea] text-sm font-semibold text-slate-700">
                    {selectedUser.firstName?.[0]?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-[1.05rem] font-semibold text-slate-900">
                        {selectedUser.firstName} {selectedUser.lastName}
                    </h2>
                    <p className="text-[11px] text-emerald-600">online</p>
                </div>
            </header>

            {loadingMessage ? (
                <div className="flex flex-1 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                </div>
            ) : (
                <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4 md:px-5">
                    {messages.length > 0 ? (
                        messages.map((msg) => {
                            const isSentByLoggedInUser = msg.userId === loggedInUserId

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${isSentByLoggedInUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[0.97rem] leading-6 ${
                                            isSentByLoggedInUser
                                                ? "bg-[#1f2937] text-white"
                                                : "border border-[#e5e7eb] bg-white text-slate-700"
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-center text-sm text-slate-500">No messages yet. Say hello.</p>
                        </div>
                    )}
                </div>
            )}

            <div className="border-t border-[#e5e7eb] bg-[#fafafa] px-3 py-3 md:px-4">
                <div className="flex items-center gap-2 rounded-md border border-[#dfe4ea] bg-white p-1.5 shadow-sm">
                    <input
                        value={inputMessage}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                sendMessageFunction()
                            }
                        }}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-1 border-0 bg-transparent px-2 py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                        type="text"
                        placeholder="Type a message..."
                    />

                    <button
                        type="button"
                        onClick={() => setShowPicker(!showPicker)}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#e5e7eb] bg-[#f8fafc] text-slate-600 transition hover:bg-[#eef2f7]"
                        aria-label="Open emoji picker"
                    >
                        <FiSmile size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={sendMessageFunction}
                        className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1f2937] text-white transition hover:bg-[#111827]"
                        aria-label="Send message"
                    >
                        <SendIcon size={16} />
                    </button>
                </div>
            </div>

            {showPicker && (
                <Modal open={showPicker} onClose={() => setShowPicker(false)}>
                    <div
                        style={{
                            position: "absolute",
                            bottom: "88px",
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