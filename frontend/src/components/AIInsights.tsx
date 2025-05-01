import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAIInsights, postAIInsight } from "../api/endpoints";
interface Insight {
  id: string;
  title: string;
  description: string;
  relatedReviews: number;
  date: string;
}

interface AIInsightsProps {
  insights: Insight[];
  businessId: number;
  onInsightsUpdated?: (insights: Insight[]) => void;
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights: initialInsights, businessId, onInsightsUpdated }) => {
  const [insights, setInsights] = useState<Insight[]>(initialInsights || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

    // On mount, try to load the latest saved insight
  useEffect(() => {
    const fetchLatestInsight = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAIInsights(businessId);
        if (response.data.insights) {
          const newInsight: Insight = {
            id: response.data.insight_id ? response.data.insight_id.toString() : Date.now().toString(),
            title: "Latest AI Analysis",
            description: response.data.insights,
            relatedReviews: 0,
            date: response.data.created_at ? response.data.created_at : new Date().toISOString(),
          };
          setInsights([newInsight]);
        }
      } catch (err) {
        console.error("Error fetching latest insight:", err);
        setError("Failed to fetch the latest insight. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId]);

  // When insights update, notify parent component
  useEffect(() => {
    if (onInsightsUpdated && insights !== initialInsights) {
      onInsightsUpdated(insights);
    }
  }, [insights, initialInsights, onInsightsUpdated]);

const handleGenerateInsights = async () => {
  try {
    setLoading(true);
    setError(null);

    // Create an AbortController to handle timeout manually
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30000); // 30 seconds timeout

    try {
      // Always call GET to generate or fetch the latest insight
      const response = await getAIInsights(businessId);
      clearTimeout(timeoutId);

      if (response.data.insights) {
        // Save to DB if not already saved (if no insight_id in response)
        if (!response.data.insight_id) {
          await postAIInsight(businessId, response.data.insights);
        }
        const newInsight: Insight = {
          id: response.data.insight_id ? response.data.insight_id.toString() : Date.now().toString(),
          title: "Latest AI Analysis",
          description: response.data.insights,
          relatedReviews: 0,
          date: response.data.created_at ? response.data.created_at : new Date().toISOString(),
        };
        const updatedInsights = [newInsight, ...insights];
        setInsights(updatedInsights);
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (axios.isCancel(err)) {
        setError("The request took too long to complete. AI analysis requires processing a lot of data and may sometimes timeout. Please try again.");
      } else if (err && typeof err === 'object' && 'code' in err && err.code === 'ECONNABORTED') {
        setError("The request timed out. Our AI server might be experiencing high load. Please try again in a moment.");
      } else {
        console.error("Error generating insights:", err);
        setError("Failed to generate insights. Please try again later.");
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    setError("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-regular">AI Insights</h2>
          <p className="text-sm text-gray-600 mt-1">
            AI-powered analysis of your reviews
          </p>
        </div>
        {insights.length > 3 && (
          <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
            View all <span className="text-xs">→</span>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No insights generated yet.</p>
            <p className="text-sm mt-2">
              Generate insights to get AI-powered analysis of your reviews.
            </p>
          </div>
        ) : (
          insights.slice(0, 3).map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-md font-medium">{insight.title}</h3>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(insight.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{insight.description}</p>
              {insight.relatedReviews > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Based on {insight.relatedReviews} reviews
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {loading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
          <div className="flex items-center">
            <div className="mr-3 animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-orange-600"></div>
            <p className="text-sm text-blue-800">
              Generating insights... This may take up to 30 seconds as we processes your review data.
            </p>
          </div>
        </div>
      )}

      <button 
        onClick={handleGenerateInsights}
        disabled={loading}
        className={`mt-6 w-full ${loading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'} text-white py-2 px-4 rounded-lg flex items-center justify-between`}
      >
        <span>{loading ? "Generating..." : error ? "Retry generation" : "Generate new insights"}</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default AIInsights;
