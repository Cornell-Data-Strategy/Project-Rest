import React from "react";

interface CriticalReview {
  id: string;
  authorName: string;
  date: string;
  rating: number;
  content: string;
  keyIssues: string[];
  response?: {
    date: string;
    content: string;
  };
}

interface CriticalReviewsProps {
  reviews: CriticalReview[];
}

const CriticalReviewCard: React.FC<{ review: CriticalReview }> = ({
  review,
}) => {
  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-medium">{review.authorName}</div>
          <div className="text-sm text-gray-500">{review.date}</div>
        </div>
        <div className="flex items-center gap-1">
          {/* TODO: Implement star rating component */}
          <span className="text-orange-600">{review.rating}/5</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-2">{review.content}</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {review.keyIssues.map((issue, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs"
          >
            {issue}
          </span>
        ))}
      </div>

      {review.response && (
        <div className="bg-gray-50 p-3 rounded-lg mt-2">
          <div className="text-sm text-gray-500 mb-1">
            Your response • {review.response.date}
          </div>
          <p className="text-sm text-gray-700">{review.response.content}</p>
        </div>
      )}
    </div>
  );
};

const CriticalReviews: React.FC<CriticalReviewsProps> = ({ reviews }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-regular">Critical Reviews</h2>
          <p className="text-sm text-gray-600 mt-1">
            Reviews that need your attention
          </p>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
          View all <span className="text-xs">→</span>
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {/* TODO: Implement actual critical reviews list */}
        {reviews.map((review) => (
          <CriticalReviewCard key={review.id} review={review} />
        ))}
      </div>

      <button className="mt-4 w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 flex items-center justify-between">
        <span>View all critical reviews</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default CriticalReviews;
