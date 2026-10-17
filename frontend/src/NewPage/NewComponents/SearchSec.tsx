import { SearchIcon } from "lucide-react";

export default function SearchSec() {
    return (
        <div className="relative">
            <input
                className="h-11 w-full rounded-md border border-[#dfe4ea] bg-white pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                type="search"
                placeholder="Search friends"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <SearchIcon size={16} />
            </div>
        </div>
    )
}