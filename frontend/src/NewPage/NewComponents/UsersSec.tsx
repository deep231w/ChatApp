export default function UsersSec(){
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
        <div
            className="flex flex-col gap-2 m-3"
        >
            {users.map((u)=>(
                        <button
                            key={u.id}
                            className="relative flex items-center justify-start  align-middle border rounded-xl h-[70px] pl-4 text-white font-bold text-2xl"
                        >
                            <p
                                className="pl-[50px]"
                            >
                                {u.name.charAt(0).toUpperCase()+ u.name.slice(1)}
                            </p>

                            <div
                                className="absolute border h-[40px] w-[40px] rounded-[50%] bg-gray-200 text-black flex items-center justify-center"
                            >
                                {u.name[0].toUpperCase()}
                            </div>
                        </button>
                    ))}
        </div>
    )
}