import React, { useEffect, useState } from "react";

interface Review {
  id: string;
  authorName: string;
  date: string;
  content: string;
  rating: number;
  reviewerType: string;
  topics: string[];
  avatarLetter?: string;
}

const RecentReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with your actual API endpoint for fetching recent reviews.
    fetch("/api/reviews/recent")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return response.json();
      })
      .then((data) => {
        // Assume the API returns an object with a reviews array.
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
      <h2 className="text-xl font-bold mb-4">Most Recent Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-gray-200 py-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  {review.avatarLetter || review.authorName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{review.authorName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2">{review.content}</p>
              <p className="mt-1 text-sm text-gray-600">
                Rating: {review.rating} / 5
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentReviews;
