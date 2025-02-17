
// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  token:string | null;
  localstorageUser:LocalStoregeUser | null;
}

type LocalStoregeUser={
  id:number,
  firstName:string,
  lastName:string,
  email:string
}
const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true, token:null, localstorageUser:null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken]=useState<string>("");
  const [localstorageUser, setLocalStorageUser]= useState<LocalStoregeUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("storedUser in local storage in useAuth = ",storedUser);

    if (storedUser) {
      try {
        setLocalStorageUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing localStorage user:", e);
      }
    }
    console.log("final localStorage statevariable valuse= ", localstorageUser);
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        console.log("User is logged in:", user);

        const newToken=await user.getIdToken();
        setToken(newToken);
        console.log("new token generated= ", newToken);

      } else {
        console.log("No user logged in");
      }
      setCurrentUser(user);
      setLoading(false);
    });
    
    return ()=>{
      console.log(" Unsubscribing Auth Listener...");

      unsubscribe();
    } // Cleanup the subscription on unmount
    
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, token, localstorageUser }}>
      {children}
    </AuthContext.Provider>
  );
};