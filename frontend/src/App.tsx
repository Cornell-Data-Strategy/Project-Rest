import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Reviews from './pages/Reviews.tsx'
import Login from './pages/Login.tsx'
import './App.css'
import Register from './pages/Register.tsx'
import { useLocation } from "react-router-dom";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("Verifying authentication...");
        setIsLoading(true);
        setError(null);

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
      } catch (error) {
        console.error("Failed to verify authentication:", error);
        setError("Authentication failed. Please try logging in again.");
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const handleLogin = () => setIsLoggedIn(true)

  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex h-screen bg-gray-50">
      {!isAuthRoute && <Sidebar />}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
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

export default App