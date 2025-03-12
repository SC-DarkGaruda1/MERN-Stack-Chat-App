import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./Store/Auth.Store";
import { Loader, Loader2 } from "lucide-react";
import { ToastContainer } from "react-toastify";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route
          element={authUser ? <Home /> : <Navigate to="/login" />}
          path="/"
        />
        <Route
          element={authUser ? <Profile /> : <Navigate to="/login" />}
          path="/profile"
        />
        <Route element={<Settings />} path="/settings" />
        <Route
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
          path="/signup"
        />
        <Route
          element={!authUser ? <Login /> : <Navigate to="/" />}
          path="/login"
        />
      </Routes>
    </>
  );
};

export default App;
