import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Check for authentication token
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        
        // Set auth token for API requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // You could fetch dashboard data here
        const fetchDashboardData = async () => {
            try {
                // Example: const response = await axios.get('/api/dashboard-data');
                // Process dashboard data...
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
                // If authentication fails, redirect to login
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setIsLoading(false);
            }
        };
        
        fetchDashboardData();
    }, [navigate]);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
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
            </div>
        </div>
    );
}

export default Dashboard;