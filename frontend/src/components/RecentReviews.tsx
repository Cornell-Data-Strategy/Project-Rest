import React, { useEffect, useState } from "react";
import { getRecentReviews } from "../api/endpoints";
import api from "../api/axios"; // Adjust the import path as needed

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
        // Ensure reviews is an array by using a fallback
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

  return (
    <div>
      <h2>Recent Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "4px"
            }}
          >
            <p>
              <strong>User:</strong> {review.username}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p>
              <strong>Source:</strong> {review.source}
            </p>
            <p>{review.content || "No review content"}</p>
            <p>
              <small>{new Date(review.review_date).toLocaleString()}</small>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentReviews;
