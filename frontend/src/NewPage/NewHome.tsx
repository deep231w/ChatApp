import { useEffect, useState } from "react"
import ConversationSec from "./NewComponents/ConversationSec"
import SearchSec from "./NewComponents/SearchSec"
import UserSettings from "./NewComponents/UserSettings"
import UsersSec from "./NewComponents/UsersSec"

type SelectedUser = {
    firebaseuid: string | null
    firstName: string
    id: string | number
    lastName: string
}

export default function NewHome() {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)
    const [isSelectedUser, setIsSelectedUser] = useState<SelectedUser>()
    const [mobileView, setMobileView] = useState<"list" | "chat">("list")
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        const updateViewport = () => {
            const matchesMobile = window.innerWidth < 768
            setIsMobile(matchesMobile)

            if (matchesMobile) {
                setMobileView((current) => {
                    if (!isSelectedUser && current === "chat") return "list"
                    return current
                })
            }
        }

        updateViewport()
        window.addEventListener("resize", updateViewport)

        return () => window.removeEventListener("resize", updateViewport)
    }, [isSelectedUser])

    const handleSelectUser = (user: SelectedUser) => {
        setIsSelectedUser(user)
        if (isMobile) {
            setMobileView("chat")
        }
    }

    const handleBackToList = () => {
        if (isMobile) {
            setMobileView("list")
            return
        }

        setSideBarOpen(true)
    }

    const showMobileList = isMobile ? mobileView === "list" : false
    const showMobileChat = isMobile ? mobileView === "chat" : false

    if (!isMobile) {
        return (
            <div className="flex h-screen w-screen overflow-hidden bg-[#f3f5f7] text-slate-800">
                <aside
                    className="relative flex h-full w-[320px] max-w-[320px] flex-col border-r border-[#e4e7eb] bg-[#f5f7f8]"
                >
                    <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Messages</p>
                            <h1 className="mt-0.5 text-[1.6rem] font-bold leading-none text-slate-900">Pingify</h1>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#dfe4ea] bg-white text-base text-slate-600 shadow-sm">
                            ✦
                        </div>
                    </div>

                    <div className="px-3 pb-2 pt-3">
                        <SearchSec />
                    </div>

                    <div className="min-h-0 flex-1 overflow-hidden px-2 pb-2">
                        <UsersSec setSideBarOpen={setSideBarOpen} setSelectedUser={handleSelectUser} />
                    </div>

                    <div className="border-t border-[#e5e7eb] bg-[#f3f5f7] px-2 pb-2 pt-2">
                        <UserSettings />
                    </div>
                </aside>

                <main className="relative flex-1 overflow-hidden bg-[#f7f7f7]">
                    {isSelectedUser ? (
                        <ConversationSec setSideBarOpen={handleBackToList} selectedUser={isSelectedUser} />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-[#f7f7f7] px-6">
                            <div className="max-w-xs text-center text-slate-600">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#dfe4ea] bg-white text-3xl shadow-sm">
                                    💬
                                </div>
                                <h2 className="mt-5 text-2xl font-semibold text-slate-900">Welcome to Pingify</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Choose a conversation from the sidebar to start messaging.
                                </p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        )
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#f3f5f7] text-slate-800">
            {showMobileList && (
                <aside
                    className="fixed inset-0 z-40 flex h-screen w-screen max-w-none flex-col border-r border-[#e4e7eb] bg-[#f5f7f8]"
                >
                    <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Messages</p>
                            <h1 className="mt-0.5 text-[1.6rem] font-bold leading-none text-slate-900">Pingify</h1>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#dfe4ea] bg-white text-base text-slate-600 shadow-sm">
                            ✦
                        </div>
                    </div>

                    <div className="px-3 pb-2 pt-3">
                        <SearchSec />
                    </div>

                    <div className="min-h-0 flex-1 overflow-hidden px-2 pb-2">
                        <UsersSec setSideBarOpen={setSideBarOpen} setSelectedUser={handleSelectUser} />
                    </div>

                    <div className="border-t border-[#e5e7eb] bg-[#f3f5f7] px-2 pb-2 pt-2">
                        <UserSettings />
                    </div>
                </aside>
            )}

            {showMobileChat && (
                <main className="fixed inset-0 z-30 overflow-hidden bg-[#f7f7f7]">
                    {isSelectedUser ? (
                        <ConversationSec setSideBarOpen={handleBackToList} selectedUser={isSelectedUser} />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-[#f7f7f7] px-6">
                            <div className="max-w-xs text-center text-slate-600">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#dfe4ea] bg-white text-3xl shadow-sm">
                                    💬
                                </div>
                                <h2 className="mt-5 text-2xl font-semibold text-slate-900">Welcome to Pingify</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Choose a conversation from the list to start messaging.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setMobileView("list")}
                                    className="mt-5 inline-flex items-center justify-center rounded-md border border-[#dfe4ea] bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                                >
                                    Open chats
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            )}
        </div>
    )
}