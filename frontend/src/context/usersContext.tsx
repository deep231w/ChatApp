// src/context/usersContext.tsx
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

interface User {
  id: number | string;
  firstName: string;
  lastName: string;
  firebaseuid?: string | null;
  email?: string;
}

interface UserType {
  users: User[];
  error: string | null;
  loading: boolean;
  loggedinUser: User | null;
}

const UserContext = createContext<UserType | null>(null);

export const useUsersContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading: authLoading, token, localstorageUser } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loggedinUser, setLoggedinUser] = useState<User | null>(null);

  useEffect(() => {
    // Wait until auth finishes initializing
    if (authLoading) {
      return;
    }

    // If neither Firebase user nor local user present, nothing to do
    if (!currentUser && !localstorageUser) {
      setUsers([]);
      setLoggedinUser(null);
      setUserLoading(false);
      return;
    }

    // token should be present for either case (firebase token or custom JWT)
    if (!token) {
      // token might be set shortly after; set loader and wait for token change
      setUserLoading(true);
      return;
    }

    let cancelled = false;

    const fetchUsers = async () => {
      try {
        setUserLoading(true);
        setError(null);

        const res = await axios.get<User[]>("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (cancelled) return;

        const fetchedUsers = res.data || [];
        setUsers(fetchedUsers);

        // Find currently logged-in user among fetched users:
        let matched: User | null = null;

        if (currentUser) {
          // Firebase user: match by firebaseuid
          matched = fetchedUsers.find((u) => u.firebaseuid && u.firebaseuid === currentUser.uid) ?? null;
        }

        if (!matched && localstorageUser) {
          // Local (manual) user: match by id
          matched =
            fetchedUsers.find((u) => String(u.id) === String(localstorageUser.id)) ??
            null;
        }

        setLoggedinUser(matched);
      } catch (err) {
        console.error("Error fetching users:", err);
        if (!cancelled) setError("Server error");
      } finally {
        if (!cancelled) setUserLoading(false);
      }
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [currentUser, localstorageUser, token, authLoading]);

  const value: UserType = {
    users,
    error,
    loading: userLoading,
    loggedinUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
