import React from "react";
import { useAuth } from "../context/authContext"; // Make sure the path is correct
import { signOut } from "firebase/auth";
import { auth } from "../context/firebase";
import { Button } from "./components/ui/button";
export const Navbar: React.FC = () => {
  const { currentUser,loading } = useAuth();

  const handleSignout= async()=>{
    await signOut(auth);
  }
  if(loading){
    return <div>loading...</div>
  }
  return (
    <nav className="flex justify-between items-center px-6 py-3">
      <div>ChatApp</div>
      <div>
        {currentUser ? (
          <>
            <span>{currentUser.displayName}</span> {/* Display user name */}
            <Button onClick={handleSignout}>Logout</Button> {/* Implement logout logic here */}
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </nav>
  );
};
