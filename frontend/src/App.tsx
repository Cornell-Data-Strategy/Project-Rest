import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Reviews from "./pages/Reviews.tsx";
import Login from "./pages/Login.tsx";
import { checkAuthStatus, logout } from "./utils/authUtils.ts";
import { UserData } from "./types";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("Verifying authentication...");
        setIsLoading(true);
        setError(null);

        const user = await checkAuthStatus();
        console.log("User data received:", user);

        if (!user) {
          console.log("No user data");
          setIsLoggedIn(false);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        } else {
          setIsLoggedIn(true);
          setUserData(user);
        }
      } catch (error) {
        console.error("Failed to verify authentication:", error);
        setError("Authentication failed. Please try logging in again.");
        setIsLoggedIn(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-beige">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-beige pt-3">
      {isLoggedIn && <Sidebar onLogout={handleLogout} />}
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
