import React from "react";

interface RatingData {
  rating: number;
  count: number;
  percentage: number;
}

interface RatingsDistributionProps {
  ratings: RatingData[];
}

const RatingsDistribution: React.FC<RatingsDistributionProps> = ({}) => {
  return <>Review Ratings Distribution</>;
};

export default RatingsDistribution;
