import { Button } from "@/components/components/ui/button";
import { DropdownMenuShortcut } from "@/components/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings2Icon, SettingsIcon, User } from "lucide-react";
import Settings from "./Settings";
import { DropdownMenuO } from "@/components/ui/DropDownMenu";

export default function UserSettings(){
    
    return (
        <div
            className=" 
                h-[70px] rounded-t-xl bg-gray-400
                flex flex-row justify-between items-center ml-3 mr-3 p-3
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

            {/* <button 
                className="text-gray-600"
            >
                <SettingsIcon/>
            </button> */}
            <DropdownMenuO/>
        </div>
    )
}