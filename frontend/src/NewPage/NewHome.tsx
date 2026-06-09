import SearchSec from "./NewComponents/SearchSec"

export default function NewHome(){

    const users = [
        {
            id:1,
            name:"deep"
        },
        {
            id:2,
            name:"seep"
        },
        {
            id:3,
            name:"reep"
        },
        {
            id:4,
            name:"jeep"
        }
        ,{
            id:5,
            name:"beep"
        }
    ]

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
                    {users.map((u)=>(
                        <div key={u.id}>
                            <p>{u.name}</p>
                        </div>
                    ))}
                </div>

            </div>

            <div
                className="w-3/4  bg-zinc-300"
            >
                
            </div>
        </div>
    )
}