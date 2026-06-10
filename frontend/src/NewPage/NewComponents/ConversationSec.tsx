import { SendIcon } from "lucide-react";
import { FiSmile } from "react-icons/fi";

export default function ConversationSec(){
    return (
        <div
            className="flex flex-col justify-between h-full ml-3 mr-3"
        >
            <div 
                className="bg-gray-100 h-[70px] w-full rounded-b-xl flex items-center p-2 gap-2"
            >
                {/* avatar */}
                <div
                    className="w-[40px] h-[40px] bg-gray-500 rounded-[50%]"
                >

                </div>
                {/* user name */}
                <div>
                    <h2
                        className="text-xl text-gray-700 text-bold"
                    >John Doe</h2>
                </div>

            </div>

            <div
                className="bg-gray-100 h-[70px] w-full rounded-t-xl flex flex-row p-3 gap-2"
            >
                <input 
                    className="w-full rounded-xl bg-gray-300 text-black p-2 "
                    type="text"
                    placeholder="Type Message ....." 
                />

                <button
                    className="bg-yellow-300 hover:bg-yellow-200 text-gray-600 px-4 py-2 rounded-lg shadow-md"
                >
                    <FiSmile size={24} />
                </button>

                <button
                    className="bg-blue-400 hover:bg-blue-300 text-gray-600 px-4 py-2 rounded-lg shadow-md"
                >
                    <SendIcon/>
                </button>
            </div>
        </div>
    )
}