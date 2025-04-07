import React, { useEffect, useState } from "react";
import { getRecentReviews } from "../api/endpoints";

// Define the Review interface to match your API response
interface Review {
  id: number;
  source: string;
  content: string | null;
  rating: number;
  review_date: string;
  sentiment_description: string;
  sentiment_score: number;
  topics: string | null;
  username: string;
}

// Props for the RecentReviews component
interface RecentReviewsProps {
  businessId: number;
}

const RecentReviews: React.FC<RecentReviewsProps> = ({ businessId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await getRecentReviews(businessId);
        console.log("API response:", response.data);
        setReviews(response.data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch recent reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentReviews();
  }, [businessId]);

  if (isLoading) {
    return <div>Loading recent reviews...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Helper to display star rating
  const renderStars = (rating: number) => {
    // clamp rating from 1 to 5 just in case
    const clamped = Math.min(Math.max(rating, 1), 5);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${
            i <= clamped ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.361 2.444a1 1 0 00-.364 1.118l1.285 3.953c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.946 2.883c-.784.57-1.838-.197-1.539-1.118l1.285-3.953a1 1 0 00-.364-1.118L2.075 9.38c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.953z" />
        </svg>
      );
    }
    return <div className="flex items-center">{stars}</div>;
  };

  // Format the date as "Mar 3, 2025" style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Most Recent Reviews</h2>
        {/* "View more" button - link to a reviews page or modal */}
        <button className="text-blue-500 hover:underline text-sm font-medium">
          View more
        </button>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews found.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* Top row: Username and date */}
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-700">
                  {review.username || "Anonymous"}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(review.review_date)}
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  {/* For example: "Regular Reviewer" or "Local Guide" */}
                  {review.source || "Regular Reviewer"}
                </span>
              </div>

              {/* Review content */}
              <p className="text-gray-700 mb-2">
                {review.content || "No review content"}
                {" "}
                <span className="text-blue-500 text-sm hover:underline cursor-pointer">
                  Read more
                </span>
              </p>

              {/* Topics or tags (e.g. "Service", "Food", "Value") */}
              {review.topics && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {review.topics.split(",").map((topic) => (
                    <span
                      key={topic.trim()}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                    >
                      {topic.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentReviews;
