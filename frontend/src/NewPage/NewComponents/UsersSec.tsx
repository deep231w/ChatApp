import { useUsersContext } from "@/context/usersContext"
import { useEffect, useState } from "react"

type props={
    setSideBarOpen:React.Dispatch<React.SetStateAction<boolean>>
}

type user={
    id:string | number,
    name:string,
    email:string,
    firebaseId:string
}
export default function UsersSec({setSideBarOpen}:props){

    const {users}= useUsersContext()

    const [availableUsers, setAvailableUsers]=useState<user[]>([]);

    useEffect(()=>{
        const usersList= users.map((u)=>({
            id:u.id,
            name:u.firstName+" "+u.lastName,
            email:u.email,
            firebaseId:u.firebaseuid
        }))

        setAvailableUsers(usersList);

    },[users])

    const [selectedUid , setSelectedUid]=useState<string | Number | null>(null)


    return(
        <div
            className="flex flex-col gap-2"
        >
            {availableUsers.map((u:any)=>(
                        <button
                            key={u.id}
                            onClick={()=>{
                                setSelectedUid(u.id)
                                setSideBarOpen(false)
                            }}
                            className={`relative flex items-center justify-start  align-middle h-[70px] text-white font-bold text-l
                                ${selectedUid === u.id?
                                "bg-slate-700":""
                            }
                            `}
                        >
                            <p
                                className="pl-[60px]"
                            >
                                {u.name.charAt(0).toUpperCase()+ u.name.slice(1)}
                            </p>

                            {/* avatar */}
                            <div
                                className="absolute border h-[40px] w-[40px] rounded-[50%] bg-gray-200 text-black flex items-center justify-center m-2"
                            >
                                {u.name[0].toUpperCase()}
                                {/* online status */}
                                <div
                                    className={`fixed border border-gray-100 rounded-[50%] h-[10px] w-[10px] mt-7 ml-6
                                    ${u.status? "bg-green-500":"bg-gray-600"}    
                                    `}
                                >

                                </div>
                            </div>
                            {selectedUid === u.id &&
                            <div
                                className="absolute h-full w-[3px] bg-gray-200"
                            >

                            </div>}
                        </button>
                    ))}
        </div>
    )
}