import { useState } from "react"
import ConversationSec from "./NewComponents/ConversationSec"
import SearchSec from "./NewComponents/SearchSec"
import UserSettings from "./NewComponents/UserSettings"
import UsersSec from "./NewComponents/UsersSec"

export default function NewHome(){

    const [sideBarOpen, setSideBarOpen]=useState<boolean>(false);

    return(
        <div className="flex flex-row h-screen w-screen">
            {/* left sidebar */}
            <div
                className={`w-1/5 bg-slate-800 flex flex-col relative md:block
                        ${sideBarOpen ? "block w-full":"hidden"}
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
                    <UsersSec/>
                </div>

                {/* Loggedin user settings  */}
                <div 
                    className="absolute bottom-0 left-0 right-0 "
                >
                    <UserSettings  />
                </div>

            </div>

            {/* chat sec */}
            <div
                className={`w-full md:w-4/5  bg-zinc-300
                        ${sideBarOpen && "hidden"}
                    `} 
            >
                <ConversationSec setSideBarOpen={setSideBarOpen}/>   
            </div>
        </div>
    )
}