// src/App.tsx
import React from "react";
import {  Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useAuth } from "./context/authContext";
import SignIn from "./auth/signin";
import SignUp from "./auth/signup";

const App: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Loading indicator while checking auth state
  }

  return (
    <BrowserRouter>
      <Routes>

       {currentUser ?(
        <>
        <Route path="signin" element={<Navigate to="/" />}/>
        <Route path="signup" element={<Navigate to="/"/>}/>
        </>
       ):(<>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="signup" element={<SignUp />}/>
        </>)}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
