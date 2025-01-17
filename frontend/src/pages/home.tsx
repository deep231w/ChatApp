import React from "react";
import { Navbar } from "../components/Navbar";
import { Chat } from "../components/chat";
import { Sidebar } from "lucide-react";

export const Home:React.FC=()=>{

    return <>
    <Navbar/>
    <br />
    <Chat/>
    
    </>
} 