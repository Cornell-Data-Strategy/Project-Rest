import React, { useEffect, useState } from "react";
import { getRatingsDistribution } from "../api/endpoints";

interface RatingData {
  rating: number;
  count: number;
  percentage: number;
}

interface RatingsDistributionProps {
  businessId?: number;
  initialRatings?: RatingData[];
  ratings?: RatingData[];
}

const RatingsDistribution: React.FC<RatingsDistributionProps> = ({ 
  businessId,
  initialRatings,
  ratings: propRatings
}) => {
  const [ratings, setRatings] = useState<RatingData[]>(propRatings || initialRatings || []);
  const [loading, setLoading] = useState<boolean>(!propRatings && !initialRatings && !!businessId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have ratings from props, use those
    if (propRatings) {
      console.log('RatingsDistribution received propRatings:', propRatings);
      setRatings(propRatings);
      setLoading(false);
      return;
    }
    
    // Otherwise if we have a businessId and no initialRatings, fetch from API
    if (businessId && !initialRatings) {
      console.log('RatingsDistribution fetching with businessId:', businessId);
      fetchRatingsDistribution();
    }
  }, [businessId, initialRatings, propRatings]);

  const fetchRatingsDistribution = async () => {
    if (!businessId) return;
    
    try {
      setLoading(true);
      const response = await getRatingsDistribution(businessId);
      setRatings(response.data.ratings);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching ratings distribution:', err);
      setError('Failed to load ratings distribution');
      setLoading(false);
    }
  };
  
  // Show loading state
  if (loading) {
    return <div className="text-center py-8">Loading ratings distribution...</div>;
  }

  // Show error state
  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  // If no ratings data is available after loading
  if (!ratings || ratings.length === 0) {
    return <div className="text-center text-gray-500">No ratings data available</div>;
  }

  // Sort ratings by rating value (1 star to 5 stars)
  const sortedRatings = [...ratings].sort((a, b) => a.rating - b.rating);
  
  // Find the maximum count to calculate relative bar lengths
  const maxCount = Math.max(...sortedRatings.map(r => r.count));
  // Height of the chart container in px (h-64 = 16rem = 256px)
  const chartHeightPx = 150;
  
  // Define star colors based on rating
  const getStarColor = (rating: number) => {
    if (rating >= 5) return "bg-green-500";
    if (rating >= 4) return "bg-blue-500";
    if (rating >= 3) return "bg-yellow-500";
    if (rating >= 2) return "bg-orange-500";
    return "bg-red-500";
  };
  
  return (
    <div className="w-full p-4">
      <h3 className="font-[500] text-2xl mb-4">Ratings Distribution</h3>
      
      <div className="flex items-end justify-center gap-2 h-55">
        {sortedRatings.map((item) => (
          <div key={item.rating} className="flex flex-col items-center">
            <div className="text-sm font-medium mb-2">
              {item.count}
            </div>
            <div 
              className={`w-12 ${getStarColor(item.rating)} transition-all duration-300`}
              style={{ 
                height: maxCount
                  ? `${Math.max((item.count / maxCount) * chartHeightPx, 10)}px`
                  : '0px',
                minHeight: item.count > 0 ? '10px' : '0',
              }}
            ></div>
            <div className="mt-2 font-medium flex items-center gap-1">
              {item.rating} <span className="text-yellow-400">★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsDistribution;
