import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Reviews from "./pages/Reviews.tsx";
import Login from "./pages/Login.tsx";
import { checkAuthStatus, logout } from "./utils/authUtils.ts";
import { UserData } from "./types";
import "./App.css";
import Register from './pages/Register.tsx'
import { useLocation } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("Verifying authentication...");
        setIsLoading(true);

        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          console.log("No token found");
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        const user = await checkAuthStatus();
        console.log("User data received:", user);

        if (!user) {
          console.log("No user data");
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        } else {
          setIsLoggedIn(true);
          setUserData(user);
        }
      } catch (err) {
        console.error("Failed to verify authentication:", err);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FBF9F7]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FBF9F7]">
      {!isAuthRoute && <Sidebar onLogout={handleLogout}/>}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard userData={userData} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/reviews"
            element={isLoggedIn ? <Reviews /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;