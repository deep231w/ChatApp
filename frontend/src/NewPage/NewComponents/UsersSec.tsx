import { useUsersContext } from "@/context/usersContext"
import { useEffect, useState } from "react"

type user={
    firebaseuid:string | null
    firstName:string
    id:string | number
    lastName:string

}

type props={
    setSideBarOpen:React.Dispatch<React.SetStateAction<boolean>>
    setSelectedUser:React.Dispatch<React.SetStateAction<user | undefined>>
}
export default function UsersSec({setSideBarOpen,setSelectedUser}:props){

    const storedUser = localStorage.getItem("user");
    const lUser = storedUser ? JSON.parse(storedUser) : null;
    const {users}= useUsersContext()

    const [availableUsers, setAvailableUsers]=useState<user[]>([]);
    
    useEffect(()=>{
        console.log("ull-=" , users);
        
        const usersList= users.map((u)=>({
            firebaseuid:u.firebaseuid,
            firstName:u.firstName,
            id:u.id,
            lastName:u.lastName
        }))

        setAvailableUsers(usersList);

    },[users])

    const [selectedUid , setSelectedUid]=useState<string | Number | null>(null)


    return(
        <div
            className="flex flex-col gap-2"
        >
            {availableUsers.
            filter((u)=>String(u.id) != String(lUser?.id)).
            map((u:any)=>(
                        <button
                            key={u.id}
                            onClick={()=>{
                                setSelectedUid(u?.id)
                                setSideBarOpen(false)
                                setSelectedUser(u)
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
                                {u?.firstName} {u?.lastName}
                            </p>

                            {/* avatar */}
                            <div
                                className="absolute border h-[40px] w-[40px] rounded-[50%] bg-gray-200 text-black flex items-center justify-center m-2"
                            >
                                {u.firstName[0].toUpperCase()}
                                {/* online status */}
                                <div
                                    className={`fixed border border-gray-100 rounded-[50%] h-[10px] w-[10px] mt-7 ml-6
                                    ${u.status? "bg-green-500":"bg-gray-600"}    
                                    `}
                                >

                                </div>
                            </div>
                            {selectedUid === u?.id &&
                            <div
                                className="absolute h-full w-[3px] bg-gray-200"
                            >

                            </div>}
                        </button>
                    ))}
        </div>
    )
}