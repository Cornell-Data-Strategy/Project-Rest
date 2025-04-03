import React, { useEffect, useState } from "react";

interface Review {
  id: number;
  source: string;
  content: string;
  rating: number;
  retrieved_at: string;
  review_date: number | null;
  review_date_estimate: string;
  username: string;
  user_review_count: number | null;
  user_profile_url: string | null;
  business_id: number;
  senti_score: number;
  sentiment_magnitude: number;
  sentiment_description: string;
  is_suggestion: boolean;
  topics: string | null;
}

// Helper: Format the review date (using review_date_estimate)
function formatReviewDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Simple Star Rating component
function StarRating({ rating }: { rating: number }) {
  const MAX_STARS = 5;
  return (
    <div className="flex">
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-orange-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.363 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.785.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.363-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
    </div>
  );
}

const RecentReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from your backend (adjust the URL as needed)
  useEffect(() => {
    fetch("/api/reviews/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the API returns an object with a reviews array: { reviews: Review[] }
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError("Error fetching reviews");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4">Loading reviews...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  // Helper: Get the first letter of the username for the avatar
  const getAvatarLetter = (name: string) => name?.charAt(0).toUpperCase() || "?";

  // Helper: Convert topics string to an array
  const parseTopics = (topicsString: string | null) => {
    if (!topicsString) return [];
    return topicsString.split(",").map((topic) => topic.trim());
  };

  // Placeholder logic for reviewer type (adjust based on your data)
  const getReviewerType = (review: Review) => {
    // For example, use the source to determine reviewer type
    if (review.source.toLowerCase() === "google") return "Local Guide";
    if (review.source.toLowerCase() === "yelp") return "Regular Reviewer";
    return "Reviewer";
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Most Recent Reviews</h2>
      {reviews.map((review) => {
        const formattedDate = formatReviewDate(review.review_date_estimate);
        const avatarLetter = getAvatarLetter(review.username);
        const topicsArray = parseTopics(review.topics);
        const reviewerType = getReviewerType(review);

        return (
          <div
            key={review.id}
            className="relative bg-white border border-gray-200 rounded-md shadow p-4 mb-6"
          >
            {/* Overlapping Avatar */}
            <div className="absolute -top-4 left-4 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow">
              {avatarLetter}
            </div>

            {/* Header: Username, Date, and Star Rating */}
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="font-bold text-gray-800 text-lg">
                  {review.username}
                </span>
                <div className="text-sm text-gray-500">{formattedDate}</div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            {/* Review Content */}
            <p className="text-gray-700 mt-2">
              {review.content.length > 120
                ? review.content.slice(0, 120) + "..."
                : review.content}
              &nbsp;
              <span className="text-blue-600 cursor-pointer">Read more</span>
            </p>

            {/* Topics (Chips) */}
            {topicsArray.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {topicsArray.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-600"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {/* Reviewer Type */}
            <div className="text-xs text-gray-500 mt-2">{reviewerType}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentReviews;
