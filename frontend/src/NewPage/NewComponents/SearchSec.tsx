import { SearchIcon } from "lucide-react";

export default function SearchSec(){
    return(
        <div
            className="flex justify-center relative"
        >
            <input
                className="w-full m-3 h-10 border-black rounded-[30px] bg-white text-black p-2"
                type="Search" 
                placeholder="Search User"
            />
            {/* search icon */}
            <div 
                className="absolute right-3 top-1/2 -translate-y-1/2 pr-4 border-black rounded-[30px] bg-gray-400 p-2 "
            >
                <SearchIcon/>
            </div>
        </div>
    )
}