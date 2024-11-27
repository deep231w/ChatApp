import React from "react";
import { useAuth } from "../context/authContext"; // Make sure the path is correct
import { signOut } from "firebase/auth";
import { auth } from "../context/firebase";

export const Navbar: React.FC = () => {
  const { currentUser,loading } = useAuth();

  const handleSignout= async()=>{
    await signOut(auth);
  }
  if(loading){
    return <div>loading...</div>
  }
  return (
    <nav>
      <div>App Name</div>
      <div>
        {currentUser ? (
          <>
            <span>{currentUser.displayName}</span> {/* Display user name */}
            <button onClick={handleSignout}>Logout</button> {/* Implement logout logic here */}
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </nav>
  );
};
