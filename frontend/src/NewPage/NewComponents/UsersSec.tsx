import { useUsersContext } from "@/context/usersContext"
import { useEffect, useState } from "react"

type user = {
    firebaseuid: string | null
    firstName: string
    id: string | number
    lastName: string
}

type props = {
    setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedUser: React.Dispatch<React.SetStateAction<user | undefined>>
}

export default function UsersSec({ setSideBarOpen, setSelectedUser }: props) {
    const storedUser = localStorage.getItem("user")
    const lUser = storedUser ? JSON.parse(storedUser) : null
    const { users } = useUsersContext()

    const [availableUsers, setAvailableUsers] = useState<user[]>([])
    const [selectedUid, setSelectedUid] = useState<string | number | null>(null)

    useEffect(() => {
        const usersList = users.map((u) => ({
            firebaseuid: u.firebaseuid,
            firstName: u.firstName,
            id: u.id,
            lastName: u.lastName,
        }))

        setAvailableUsers(usersList)
    }, [users])

    return (
        <div className="flex h-full flex-col gap-1 overflow-y-auto py-1">
            {availableUsers
                .filter((u) => String(u.id) !== String(lUser?.id))
                .map((u: any) => {
                    const isSelected = selectedUid === u.id

                    return (
                        <button
                            key={u.id}
                            onClick={() => {
                                setSelectedUid(u?.id)
                                setSideBarOpen(false)
                                setSelectedUser(u)
                            }}
                            className={`flex w-full items-center gap-3 px-2 py-2 text-left transition-colors ${
                                isSelected ? "bg-white shadow-sm ring-1 ring-[#e5e7eb]" : "hover:bg-white/70"
                            }`}
                        >
                            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dfe4ea] text-sm font-semibold text-slate-700">
                                {u.firstName?.[0]?.toUpperCase() || "U"}
                                <span
                                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#f5f7f8] ${
                                        u.status ? "bg-emerald-500" : "bg-slate-400"
                                    }`}
                                />
                            </div>

                            <div className="min-w-0 flex-1 border-b border-[#eef1f4] pb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="truncate text-[0.97rem] font-medium text-slate-900">
                                        {u?.firstName} {u?.lastName}
                                    </p>
                                    <span className="text-[10px] font-medium text-slate-400">2:45 PM</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between gap-2">
                                    <p className="truncate text-sm text-slate-500">Hey, how are you?</p>
                                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1f2937] px-1 text-[10px] font-semibold text-white">
                                        3
                                    </span>
                                </div>
                            </div>
                        </button>
                    )
                })}
        </div>
    )
}