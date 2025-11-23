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

        {/* DEFAULT */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default App;

//OLD

// import React, { useState } from "react";
// import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
// import { useAuth } from "./context/authContext";
// import SignIn from "./auth/signin";
// import SignUp from "./auth/signup";
// import { io } from "socket.io-client";
// import { ProtectedRoute } from "./protectedroute";
// import { Sidebar } from "./components/sidebar";
// import { Chat } from "./components/chat";
// import { useUsersContext } from "./context/usersContext";
// import Loader from "./components/ui/Loader";

// const App: React.FC = () => {
//   const { currentUser, loading:userAuth ,localstorageUser} = useAuth();
//   const {loading}=useUsersContext();
//   const [selectUser, setSelectuser]=useState<string | null>(null);
//   const [FirstUsername, setFirstUsername]= useState<string | null>();
//   if (loading || userAuth) {
//     return <Loader/>; 
//   }

//   return (
//     <BrowserRouter>
//       {(currentUser || localstorageUser) && (
//         <div className="flex flex-col h-screen bg-gray-200" >
          

//           {/* Main Content */}
//           <div className="flex flex-1 overflow-hidden">
//             {/* Sidebar */}
//             <div className="w-1/5 min-w-[200px] p-4">
//               <Sidebar onSelectuser={(user: any) => setSelectuser(user)} onRecivername={(username:string)=>setFirstUsername(username)} />
//             </div>
//             {/* Chat Area */}
//             <div className="flex-1 p-4">
//               <Routes>
//                 <Route
//                   path="/"
//                   element={
//                     <ProtectedRoute>
//                      <Chat reciverId={selectUser} userName={FirstUsername}/>
//                     </ProtectedRoute>
//                   }
//                 />
//                 {/* <Route path="/signin" element={<SignIn/>} />
//                 <Route path="/signup" element={<SignUp/>} /> */}
//               </Routes>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* If not authenticated, show auth routes */}
//       {!currentUser  && !localstorageUser && (
//         <Routes>
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="*" element={<Navigate to="/signin" />} />
//         </Routes>
//       )}
//     </BrowserRouter>
//   );
// };

// export default App;
