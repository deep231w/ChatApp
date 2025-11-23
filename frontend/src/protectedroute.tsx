import React from "react";
import { useAuth } from "./context/authContext";
import { Navigate } from "react-router-dom";


export const ProtectedRoute:React.FC<{children:React.ReactElement}> =({children})=>{
    const {currentUser, localstorageUser}= useAuth();
    console.log("current user in protected route- ", currentUser);
    
    
    if(!currentUser && !localstorageUser){
        return <Navigate to={"/signin"}/>;
    }

    return children;
}
