import React, { useState, useEffect } from "react";

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

const RecentReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from the backend for a specific business (e.g., business_id = 1)
  useEffect(() => {
    fetch("/api/reviews/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the API returns { reviews: Review[] }
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
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="gray-border rounded-lg p-4">
      <h2>Most Recent Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="mb-4">
            <div>
              <strong>{review.username}</strong> -{" "}
              {new Date(review.review_date_estimate).toLocaleDateString()}
            </div>
            <div>{review.content}</div>
            <div>Rating: {review.rating}</div>
            <div>Sentiment: {review.sentiment_description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentReviews;
