import { createContext, useContext, useState } from "react"

interface UserIdType{
    selectedId:string | null,
    setSelectedUserId: (id:string)=>void
}


const SelectUserContext= createContext<UserIdType|undefined>(undefined);

export const useSelectedId = () => {
    const context = useContext(SelectUserContext);
    if (!context) {
        throw new Error("useSelectedId must be used within a SelectUserIdProvider");
    }
    return context;
};

export const SelectUserIdProvider= ({children}:{children:React.ReactNode})=>{
    const [selectedId, setSelectedUserId] = useState<string | null>(null);

    
return      <SelectUserContext.Provider value={{selectedId,setSelectedUserId}}>
                {children}
            </SelectUserContext.Provider>
}

