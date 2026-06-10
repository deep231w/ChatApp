export default function ConversationSec(){
    return (
        <div
            className="flex flex-col justify-between h-full ml-3 mr-3"
        >
            <div 
                className="bg-gray-100 h-[70px] w-full rounded-b-xl"
            >

            </div>

            <div
                className="bg-gray-100 h-[70px] w-full rounded-t-xl flex flex-row p-3 gap-2"
            >
                <input 
                    className="w-full rounded-xl bg-gray-300 text-black p-2 "
                    type="text"
                    placeholder="Type Message ....." 
                />

                <button>
                    Send
                </button>
            </div>
        </div>
    )
}