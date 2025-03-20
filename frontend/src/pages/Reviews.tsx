import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus } from "../utils/authUtils";
import { UserData } from "../types";

function Reviews() {
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

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-xl font-semibold">Loading reviews...</div>
            </div>
        );
    }

    return (
        <div className="h-full p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Reviews</h1>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Reviews</h2>
                <p className="text-gray-600">Here you can view and manage your reviews.</p>

                {userData && userData.businesses && userData.businesses.length > 0 ? (
                    <div className="mt-6">
                        <p className="font-medium mb-2">Reviews for {userData.businesses[0].name}</p>
                        {/* Future enhancement: Add actual reviews here */}
                        <p className="text-sm text-gray-500">Review content will be displayed here.</p>
                    </div>
                ) : (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-yellow-700">No business or reviews found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Reviews;
