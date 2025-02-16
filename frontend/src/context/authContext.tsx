
// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  token:string | null;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true, token:null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken]=useState<string>("");

  useEffect(() => {
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
    <AuthContext.Provider value={{ currentUser, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};












// const fetchSentId= async ()=>{
//   try{
//     const response =await axios.get("http://localhost:3000/api/user/me",{
//       withCredentials:true,
//     })

//     const data=await response.data;

//     setSentId(data);
//     console.log("fetched cookie data", data);

//   }catch(e){
//     console.log("error cookie fetching", e)
//   }
// }
// if(user) fetchSentId();