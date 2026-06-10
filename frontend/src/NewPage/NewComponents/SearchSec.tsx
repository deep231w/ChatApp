import { SearchIcon } from "lucide-react";

export default function SearchSec(){
    return(
        <div
            className="flex justify-center relative"
        >
            <input
                className="w-full m-3 h-[50px] border-black rounded-[30px] bg-slate-700 text-black p-2 pl-10"
                type="Search" 
                placeholder="Search Friends To Chat"
            />
            {/* search icon */}
            <div 
                className="absolute left-3 top-1/2 -translate-y-1/2 pr-4  p-2 text-gray-300"
            >
                <SearchIcon/>
            </div>
        </div>
    )
}