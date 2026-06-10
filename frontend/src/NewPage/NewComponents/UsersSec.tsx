export default function UsersSec(){
        const users = [
        {
            id:1,
            name:"deep",
            status:true
        },
        {
            id:2,
            name:"seep",
            status:true
        },
        {
            id:3,
            name:"reep",
            status:false
        },
        {
            id:4,
            name:"jeep",
            status:true
        }
        ,{
            id:5,
            name:"beep",
            status:false
        }
    ]


    return(
        <div
            className="flex flex-col gap-2 m-3"
        >
            {users.map((u)=>(
                        <button
                            key={u.id}
                            className="relative flex items-center justify-start  align-middle h-[70px] pl-4 text-white font-bold text-l"
                        >
                            <p
                                className="pl-[50px]"
                            >
                                {u.name.charAt(0).toUpperCase()+ u.name.slice(1)}
                            </p>

                            {/* avatar */}
                            <div
                                className="absolute border h-[40px] w-[40px] rounded-[50%] bg-gray-200 text-black flex items-center justify-center"
                            >
                                {u.name[0].toUpperCase()}
                                <div
                                    className=" fixed border border-gray-100 rounded-[50%] h-[10px] w-[10px] bg-green-800 mt-7 ml-6"
                                >

                                </div>
                            </div>
                            {/* online status */}
                            
                        </button>
                    ))}
        </div>
    )
}