import React from "react";
import { getAIInsights } from "../api/endpoints";

interface Insight {
  id: string;
  type: "positive" | "negative" | "neutral" | "suggestion";
  title: string;
  description: string;
  relatedReviews: number;
  date: string;
}

interface AIInsightsProps {
  insights: Insight[];
}



const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-regular">AI Insights</h2>
          <p className="text-sm text-gray-600 mt-1">
            AI-powered analysis of your reviews
          </p>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
          View all <span className="text-xs">→</span>
        </button>
      </div>

      <div>
        {/* TODO:  */}
      </div>

      <button className="mt-6 w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 flex items-center justify-between">
        <span>Generate new insights</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default AIInsights;
