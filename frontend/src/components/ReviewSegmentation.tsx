import React, { useState, useEffect } from "react";
import { getTopicsFrequency } from "../api/endpoints";

interface TopicData {
  type: string;
  count: number;
  color: string;
  description: string;
}

interface ReviewSegmentationProps {
  businessId?: number;
  initialSegments?: TopicData[];
  segments?: TopicData[];
}

const ReviewSegmentation: React.FC<ReviewSegmentationProps> = ({ 
  businessId,
  initialSegments,
  segments: propSegments
}) => {
  const [topics, setTopics] = useState<TopicData[]>(propSegments || initialSegments || []);
  const [loading, setLoading] = useState<boolean>(!propSegments && !initialSegments && !!businessId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have segments from props, use those
    if (propSegments) {
      console.log('ReviewSegmentation received propSegments:', propSegments);
      setTopics(propSegments);
      setLoading(false);
      return;
    }
    
    // Otherwise if we have a businessId and no initialSegments, fetch from API
    if (businessId && !initialSegments) {
      console.log('ReviewSegmentation fetching with businessId:', businessId);
      fetchTopicsFrequency();
    }
  }, [businessId, initialSegments, propSegments]);

  const fetchTopicsFrequency = async () => {
    if (!businessId) return;
    
    try {
      setLoading(true);
      const response = await getTopicsFrequency(businessId);
      setTopics(response.data.topics);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching topics frequency:', err);
      setError('Failed to load topics frequency');
      setLoading(false);
    }
  };
  
  // Show loading state
  if (loading) {
    return <div className="text-center py-8">Loading topic data...</div>;
  }

  // Show error state
  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  // If no topics data is available after loading
  if (!topics || topics.length === 0) {
    return <div className="text-center text-gray-500">No topic data available</div>;
  }

  // Find the maximum count to calculate relative circle sizes
  const maxCount = Math.max(...topics.map(t => t.count));
  
  // Calculate relative sizes for circles
  const getCircleSize = (count: number) => {
    const minSize = 20; // Minimum size in pixels
    const maxSize = 120; // Maximum size in pixels
    return minSize + ((count / maxCount) * (maxSize - minSize));
  };
  
  return (
    <div className="w-full p-4">
      <h3 className="font-[500] text-2xl mb-4">Review Segmentation</h3>
      
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full flex flex-col">

          {/* First row with 2 circles */}
          <div className="flex justify-center gap-x-4 mb-4">
            {topics.slice(0, 2).map((topic, index) => (
              <div key={index} className="flex flex-col items-center ">
                <div 
                  className="flex items-center justify-center rounded-full text-white text-sm font-medium transition-all duration-300"
                  style={{ 
                    backgroundColor: topic.color,
                    width: `${getCircleSize(topic.count)}px`, 
                    height: `${getCircleSize(topic.count)}px`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-white text-l font-[400]">{topic.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second row with the other 2 circles, offset to create zigzag */}
          <div className="flex justify-center gap-x-4 mt-2 pl-8">
            {topics.slice(2).map((topic, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="flex items-center justify-center rounded-full text-white text-sm font-medium transition-all duration-300"
                  style={{ 
                    backgroundColor: topic.color,
                    width: `${getCircleSize(topic.count)}px`, 
                    height: `${getCircleSize(topic.count)}px`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-white text-l font-[400]">{topic.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSegmentation;
