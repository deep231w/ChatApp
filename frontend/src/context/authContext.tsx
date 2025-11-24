//NEW
// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  token: string | null;
  localstorageUser: LocalStoregeUser | null;
  setLocalStorageUser: (user:LocalStoregeUser | null)=>void;
}

type LocalStoregeUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  token: null,
  localstorageUser: null,
  setLocalStorageUser:null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [localstorageUser, setLocalStorageUser] = useState<LocalStoregeUser | null>(null);

  useEffect(() => {
    setLoading(true);

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) setLocalStorageUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken); // Pick token for custom users

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const firebaseToken = await user.getIdToken();
        setToken(firebaseToken); //  Firebase users get token from Firebase
        setCurrentUser(user);
      }else
        {
          localStorage.removeItem("user");
          setLocalStorageUser(null);
          setToken(null);
          setCurrentUser(null);
        }
        setLoading(false);

    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, token, localstorageUser ,setLocalStorageUser}}>
      {children}
    </AuthContext.Provider>
  );
};