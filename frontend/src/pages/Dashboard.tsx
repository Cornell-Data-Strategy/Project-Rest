import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus, logout } from "../utils/authUtils";
import { UserData } from "../types";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const user = await checkAuthStatus();
                if (!user) {
                    navigate('/login');
                    return;
                }
                setUserData(user);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to verify authentication:", error);
                navigate('/login');
            }
        };
        
        verifyAuth();
    }, [navigate]);
    
    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            navigate('/login');
        } else {
            console.error("Logout failed");
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-xl font-semibold">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="h-full p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Logout
                </button>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Welcome to your dashboard!</h2>
                <p className="text-gray-600">This is where your dashboard content will go.</p>
                {userData && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="font-medium">Logged in as: {userData.first_name} {userData.last_name}</p>
                        <p className="text-sm text-gray-600">{userData.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;