import SearchSec from "./NewComponents/SearchSec"
import UsersSec from "./NewComponents/UsersSec"

export default function NewHome(){

    return(
        <div className="flex flex-row h-screen w-screen gap-2">

            <div
                className="w-1/4 bg-fuchsia-950 flex flex-col"
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

            </div>

            <div
                className="w-3/4  bg-zinc-300"
            >
                
            </div>
        </div>
    )
}