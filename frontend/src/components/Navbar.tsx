import React from "react";
import { useAuth } from "../context/authContext"; // Make sure the path is correct
import { signOut } from "firebase/auth";
import { auth } from "../context/firebase";
import { Button } from "./components/ui/button";

export const Navbar: React.FC = () => {
  const { currentUser,loading ,localstorageUser} = useAuth();

  const handleSignout= async()=>{
    await signOut(auth);
  }
  if(loading){
    return <div>loading...</div>
  }
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-600 shadow-md">
      <div className="text-xl font-bold text-white">ChatApp</div>
      <div>
        {currentUser ? (
          <>
            <span className="text-white text-xl font-bold ">{localstorageUser?.firstName}</span> {/* Display user name */}
            <Button onClick={handleSignout}>Logout</Button> {/* Implement logout logic here */}
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </nav>
  );
};
