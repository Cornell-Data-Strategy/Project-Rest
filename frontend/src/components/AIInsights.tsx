import React, { useState, useEffect } from "react";
import { getAIInsights, generateAIInsight } from "../api/endpoints";
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

    const genResponse = await generateAIInsight(businessId);
    if (genResponse.data && genResponse.data.insight) {
      const newInsight: Insight = {
        id: genResponse.data.insight.id ? genResponse.data.insight.id.toString() : Date.now().toString(),
        title: "Latest AI Analysis",
        description: genResponse.data.insight.content,
        relatedReviews: 0,
        date: genResponse.data.insight.created_at ? genResponse.data.insight.created_at : new Date().toISOString(),
      };
      setInsights([newInsight]);
    } else if (genResponse.data && genResponse.data.message) {
      setError(genResponse.data.message);
    } else {
      setError("Failed to generate a new insight.");
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
          insights.slice(0, 3).map((insight, idx) => (
            <div
              key={insight.id + '-' + idx}
              className="relative border-l-4 border-orange-500 bg-white shadow-md rounded-md p-5 pl-7 transition hover:shadow-lg"
            >
              {/* AI icon/avatar */}
              <div className="absolute -left-5 top-5 bg-orange-500 rounded-full h-8 w-8 flex items-center justify-center shadow">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M9.5 10.5a2.5 2.5 0 015 0v1a2.5 2.5 0 01-5 0v-1z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="15.5" r="1" fill="currentColor" />
                </svg>
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2">
                    {insight.title}
                  </h3>
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {new Date(insight.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-800 text-[15px] leading-relaxed mb-2">{insight.description}</p>
              {insight.relatedReviews > 0 && (
                <p className="text-xs text-gray-500 mt-1 italic">
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
