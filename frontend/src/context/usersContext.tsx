import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    firebaseuid: string;
}

interface UserType {
    users: User[];
    error: string | null;
    loading: boolean;
    loggedinUser:User |null
}

const UserContext = createContext<UserType | null>(null);

export const useUsersContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser ,loading,token} = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [userLoading, setUserLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [loggedinUser, setLoggedinUser]=useState<User | null>(null);
    useEffect(() => {
        if(loading) return;
        if (!currentUser) {

            console.warn(" currentUser is NULL, skipping fetchUsers()");
            return; // Don't fetch if no user is logged in
        }
        if(!loading){
            console.log("current user = ",currentUser.uid)
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/user",{
                    headers:{Authorization:`Bearer ${token}`},
                    withCredentials:true
                  });
                setUsers(response.data);
                console.log("Fetched users:", response.data);


                const matchedUser = await response.data.find((user: User) => user.firebaseuid === currentUser?.uid);
                

                if (matchedUser) {
                    setLoggedinUser(matchedUser.id);
                    console.log("match user", matchedUser)
                    console.log("Logged-in user data in usercontext= :", matchedUser.id);
                } else {
                    setLoggedinUser(null);
                    console.warn(" No matching user found in database.");
                }

            } catch (e) {
                console.error(" Error fetching users:", e);
                setError("Server error");
            } finally {
                setUserLoading(false);
            }
        };

        fetchUsers();
    }, [currentUser, loading]); // Depend on `currentUser` to ensure it's available

    return (
        <UserContext.Provider value={{ users, loading, error, loggedinUser }}>
            {children}
        </UserContext.Provider>
    );
};
