import React, { useEffect, useState } from "react";
import { getRecentReviews } from "../api/endpoints";

interface Review {
  id: number;
  source: string;
  content: string | null;
  rating: number;
  review_date: string;
  topics: string | null;
  username: string;
  is_suggestion: boolean;
  avatarUrl?: string;
}

interface RecentReviewsProps {
  businessId: number;
}

// Single review card component with AI Insights toggle
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const [showAI, setShowAI] = useState(false);

  const toggleAI = () => {
    setShowAI((prev) => !prev);
  };

  // Render rating stars (orange)
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 transition duration-200 ${
            i <= rating ? "text-orange-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.361 2.444a1 1 0 00-.364 1.118l1.285 3.953c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.946 2.883c-.784.57-1.838-.197-1.539-1.118l1.285-3.953a1 1 0 00-.364-1.118L2.075 9.38c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.953z" />
        </svg>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Render a badge based on rating
  const renderRatingBadge = (rating: number) => {
    if (rating > 3) {
      return (
        <span className="ml-2 text-sm font-bold text-green-500">Excellent</span>
      );
    } else if (rating < 3) {
      return (
        <span className="ml-2 text-sm font-bold text-red-500">Needs Improvement</span>
      );
    } else {
      return (
        <span className="ml-2 text-sm font-bold text-yellow-500">Average</span>
      );
    }
  };

  // Format the date as "Feb 5, 2025"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm transform hover:-translate-y-1 hover:shadow-xl transition duration-300">
      {/* Top row: Avatar + Username on left; Stars and badge on right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span className="text-gray-500 font-semibold">
              {review.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {review.username || "Anonymous"}
          </div>
        </div>
        <div className="flex items-center">
          {renderStars(review.rating)}
          {renderRatingBadge(review.rating)}
        </div>
      </div>

      {/* Middle row: Date and source on left; Topics on right */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-gray-500">
          {formatDate(review.review_date)}{" "}
          <span className="font-medium text-gray-700 ml-1">
            {review.source || "Google"}
          </span>
        </div>
        {review.topics && (
          <div className="flex flex-wrap items-center gap-2">
            {review.topics.split(",").map((topic) => (
              <span
                key={topic.trim()}
                className="px-2 py-1 border border-orange-300 text-orange-600 text-xs rounded-full"
              >
                {topic.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Review content */}
      <p className="text-gray-700 mt-3 leading-relaxed">
        {review.content || "No review content"}{" "}
        <span className="text-orange-500 text-sm ml-1 hover:underline transition duration-200 cursor-pointer">
          Read more
        </span>
      </p>

      {/* AI Insights Button */}
      <div className="mt-3">
        <button
          onClick={toggleAI}
          className="text-sm font-semibold text-blue-500 hover:underline transition duration-200"
        >
          {showAI ? "Hide AI Insights" : "Show AI Insights"}
        </button>
      </div>

      {/* AI Insights Placeholder */}
      {showAI && (
        <div className="mt-2 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600">
            AI Insights: This review highlights excellent service and quality. Our AI analysis suggests that the positive sentiment is driven by the consistent quality of the food and friendly staff.
          </p>
        </div>
      )}
    </div>
  );
};

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
    return <div className="p-4">Loading recent reviews...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6 border-b pb-2">
        <h2 className="text-xl font-regular text-gray-800">Recent Reviews</h2>
        <button className="text-orange-500 hover:underline text-sm font-medium">
          View more
        </button>
      </div>
      {/* Scrollable container for reviews */}
      <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews found.</p>
        ) : (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        )}
      </div>
    </div>
  );
};

export default RecentReviews;
