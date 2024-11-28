import React from "react";
import { useAuth } from "./context/authContext";
import { Navigate } from "react-router-dom";


export const ProtectedRoute:React.FC<{children:React.ReactElement}> =({children})=>{
    const {currentUser}= useAuth();

    if(!currentUser){
        return <Navigate to={"/signin"}/>;
    }

    return children;
}
