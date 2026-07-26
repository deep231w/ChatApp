import { useState } from "react"
import ConversationSec from "./NewComponents/ConversationSec"
import SearchSec from "./NewComponents/SearchSec"
import UserSettings from "./NewComponents/UserSettings"
import UsersSec from "./NewComponents/UsersSec"

export default function NewHome(){

    const [sideBarOpen, setSideBarOpen]=useState<boolean>(false);
    const [isSelectedUser, setIsSelectedUser]=useState<string>("");

    return(
        <div className="flex flex-row h-screen w-screen">
            {/* left sidebar */}
            <div
                className={`
                    fixed z-50
                    h-screen w-full
                    bg-slate-800
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${sideBarOpen
                    ? "translate-x-0"
                    : "-translate-x-full"}
                    md:translate-x-0
                    md:static
                    md:w-1/5
                `}
                >
                {/* logo */}
                <div
                    className="text-white text-3xl font-bold p-3"
                >
                    Pingify
                </div>
                {/* search */}
                <div
                    className=""
                >
                    <SearchSec/>
                </div>
                {/* users list */}
                <div>
                    <UsersSec setSideBarOpen={setSideBarOpen} setSelectedUser={setIsSelectedUser}/>
                </div>

                {/* Loggedin user settings  */}
                <div 
                    className="absolute bottom-0 left-0 right-0 "
                >
                    <UserSettings  />
                </div>

            </div>

            {/* chat sec */}
            {isSelectedUser ? 
                <div
                    className={`w-full md:w-4/5  bg-zinc-300`} 
                >
                    <ConversationSec setSideBarOpen={setSideBarOpen}/>   
                </div>:
                <div className="w-full md:w-4/5 bg-zinc-100 flex items-center justify-center">
                    <div className="text-center max-w-sm">
                        <div className="mx-auto h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-gray-600">
                            💬
                        </div>

                        <h1 className="mt-6 text-3xl font-bold text-gray-800">
                            Welcome to Pingify
                        </h1>

                        <p className="mt-3 text-gray-500">
                            Choose a conversation from the sidebar to start messaging.
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}