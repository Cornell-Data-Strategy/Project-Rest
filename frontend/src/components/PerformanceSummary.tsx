import React from "react";

interface PerformanceMetric {
  label: string;
  value: string | number;
  subtext: string;
}

interface PerformanceSummaryProps {
  metrics: {
    reviewCount: number;
    averageRating: number;
    sentimentScore: number;
    mostMentionedTopic: string;
  };
}


// todo, define the api in endpoints.ts then fetch the data here, pass it down as props to the
//  component below and render the data 


const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm shadow-orange gray-border">
      <div className="flex flex-col justify-start items-start mb-6">
        <h2 className="text-xl font-regular text-coolgray">Performance Summary</h2>
        <button className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
          View your latest reviews and insights
        </button>
      </div>

    </div>
  );
};

export default PerformanceSummary;
