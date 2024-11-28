import React ,{ createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


interface socketContextType {
    socket:null | Socket
}

const socketContxt= createContext<socketContextType | undefined>(undefined)

export const useSocket= ():socketContextType =>{
    const context= useContext(socketContxt);

    if(!context){
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
}

export const SocketProvider:React.FC<{children:React.ReactNode}>= ({children})=>{
    const [socket, setSocket]=useState<Socket | null>(null)

    useEffect(()=>{
        const newSocket= io("http://localhost:3000");
        setSocket(newSocket);

        return ()=>{
            newSocket.close();
        }
    },[])

    return<>
    <socketContxt.Provider value={{socket}}>
        {children}
    </socketContxt.Provider>
    </>
}