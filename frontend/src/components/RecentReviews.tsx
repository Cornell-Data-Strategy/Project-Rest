import React from "react";

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

interface RecentReviewsProps {
  reviews: Review[];
}


const RecentReviews: React.FC<RecentReviewsProps> = ({ }) => {
  return (
<div className="gray-border rounded-lg p-4">MOST RECENT REVIEWS TODO</div>
  );
};

export default RecentReviews;
