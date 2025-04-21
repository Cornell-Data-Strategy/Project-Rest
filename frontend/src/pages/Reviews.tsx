import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus, logout } from "../utils/authUtils";
import { Review, UserData } from "../types";
import ReviewComponent from "../components/ReviewComponent";

function Reviews() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]); // replace with typed Review[] if available

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async (businessId: number) => {
            try {
                const response = await fetch(`/reviews/${businessId}`);
                const data = await response.json();
                setReviews(data.reviews || []);
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
                setError("Could not load reviews.");
            }
        };

        const verifyAuth = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const user = await checkAuthStatus();
                if (!user) {
                    navigate('/login');
                    return;
                }

                setUserData(user);
                
                if (user.businesses && user.businesses.length > 0) {
                    const businessId = user.businesses[0].id;
                    await fetchReviews(businessId);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Failed to verify authentication:", error);
                setError("Authentication failed.");
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [navigate]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="h-full p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Reviews</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Recent Reviews for {userData?.businesses[0].name}
                </h2>

                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review, idx) => (
                            <ReviewComponent
                                key={idx}
                                reviewerName={review.username || "Anonymous"}
                                date={String(review.review_date || review.review_date_estimate)}
                                title={review.source}
                                content={review.content || ""}
                                rating={review.rating || 0}
                                tags={review.topics ? review.topics.split(",") : []}
                                trusted={review.user_review_count ? review.user_review_count > 10 : false}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No reviews found.</p>
                )}
            </div>
        </div>
    );
}

export default Reviews;
