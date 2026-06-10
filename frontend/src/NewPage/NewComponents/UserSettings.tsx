import { Settings2Icon, SettingsIcon } from "lucide-react";

export default function UserSettings(){
    return (
        <div
            className=" 
                h-[70px] rounded-t-xl bg-gray-400
                flex flex-row justify-between items-center ml-3 mr-2 p-3
            "
        >
            <div
                className="flex flex-row gap-1 items-center"
            >
                <div
                    className="h-[40px] w-[40px] bg-gray-300 rounded-[50%]"
                >

                </div>
                <h2>Deepak Kumar </h2>
            </div>

            <button 
                className="text-gray-600"
            >
                <SettingsIcon/>
            </button>
        </div>
    )
}