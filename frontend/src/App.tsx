import React, { useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useAuth } from "./context/authContext";
import SignIn from "./auth/signin";
import SignUp from "./auth/signup";
import { io } from "socket.io-client";
import { ProtectedRoute } from "./protectedroute";
import { Sidebar } from "./components/sidebar";
import { Chat } from "./components/chat";



const App: React.FC = () => {
  const { currentUser, loading ,localstorageUser} = useAuth();
  const [selectUser, setSelectuser]=useState<string | null>(null);
  const [FirstUsername, setFirstUsername]= useState<string | null>();
  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <BrowserRouter>
      {(currentUser || localstorageUser) && (
        <div className="flex flex-col h-screen bg-gray-200" >
          

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/5 min-w-[200px] p-4">
              <Sidebar onSelectuser={(user: any) => setSelectuser(user)} onRecivername={(username:string)=>setFirstUsername(username)} />
            </div>
            {/* Chat Area */}
            <div className="flex-1 p-4">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                     <Chat reciverId={selectUser} userName={FirstUsername}/>
                    </ProtectedRoute>
                  }
                />
                <Route path="signin" element={<Navigate to="/" />} />
                <Route path="signup" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}

      {/* If not authenticated, show auth routes */}
      {!currentUser  && !localstorageUser && (
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="signin" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
