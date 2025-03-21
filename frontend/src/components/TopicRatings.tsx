import React from "react";

interface TopicRating {
  topic: string;
  rating: number;
  reviewCount: number;
  description: string;
}

interface TopicRatingsProps {
  ratings: TopicRating[];
}

const RatingBar: React.FC<{ rating: number }> = ({ rating }) => {
  const percentage = (rating / 5) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-orange-600 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const TopicRatingCard: React.FC<{ rating: TopicRating }> = ({ rating }) => {
  return (
<>todo each topic card</>
  );
};

const TopicRatings: React.FC<TopicRatingsProps> = ({}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm shadow-orange gray-border">
      <div className="flex flex-col justify-start items-start mb-6">
         todo each topic with reating
      </div>

    </div>
  );
};

export default TopicRatings;
