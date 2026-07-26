//NEW
import React, { useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import { useAuth } from "./context/authContext";
import { useUsersContext } from "./context/usersContext";

import SignIn from "./auth/signin";
import SignUp from "./auth/signup";

import { ProtectedRoute } from "./protectedroute";
import { Sidebar } from "./components/sidebar";
import { Chat } from "./components/chat";

import Loader from "./components/ui/Loader";
import NewHome from "./NewPage/NewHome";

function MainLayout({ selectUser, FirstUsername, setSelectuser, setFirstUsername }) {
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <div className="w-1/5 min-w-[200px] p-4">
          <Sidebar
            onSelectuser={setSelectuser}
            onRecivername={setFirstUsername}
          />
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 p-4">
          <Chat reciverId={selectUser} userName={FirstUsername} />
        </div>

      </div>
    </div>
  );
}

const App: React.FC = () => {
  const { currentUser, loading: authLoading, localstorageUser } = useAuth();
  const { loading: usersLoading } = useUsersContext();

  const [selectUser, setSelectuser] = useState<string | null>(null);
  const [FirstUsername, setFirstUsername] = useState<string | null>(null);

  // GLOBAL LOADING
  if (authLoading || usersLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/signin"
          element={
            !currentUser && !localstorageUser
              ? <SignIn />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/signup"
          element={
            !currentUser && !localstorageUser
              ? <SignUp />
              : <Navigate to="/" />
          }
        />

        {/* PROTECTED HOME */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout
                selectUser={selectUser}
                FirstUsername={FirstUsername}
                setSelectuser={setSelectuser}
                setFirstUsername={setFirstUsername}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/newhome"
          element={
            <ProtectedRoute>
              <NewHome
                // selectUser={selectUser}
                // FirstUsername={FirstUsername}
                // setSelectuser={setSelectuser}
                // setFirstUsername={setFirstUsername}
              />
            </ProtectedRoute>
          }
        />

        {/* DEFAULT */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default App;
