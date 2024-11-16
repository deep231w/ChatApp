// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
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
        {/* Route for authenticated user - default to "/" */}
        < Route
          path="/"
          element={currentUser ? <p>Welcome, {currentUser.email}</p> : <Navigate to="/signin" />}
        />

        {/* SignIn and SignUp Routes */}
        {!currentUser && (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}

        {/* Catch-all route to redirect any unknown path */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
