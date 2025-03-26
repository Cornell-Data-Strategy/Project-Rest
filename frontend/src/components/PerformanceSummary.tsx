import React, { useEffect, useState } from "react";
import { getBusinessSummary } from "../api/endpoints";

interface PerformanceMetric {
  label: string;
  value: string | number;
  subtext: string;
}

interface PerformanceSummaryProps {
  businessId: number;
  metrics?: {
    reviewCount: number;
    averageRating: number;
    sentimentScore: number;
    mostMentionedTopic: string;
  };
}

const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({ businessId, metrics: propMetrics }) => {
  const [metrics, setMetrics] = useState<PerformanceSummaryProps["metrics"]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (propMetrics) {
      setMetrics(propMetrics);
      return;
    }

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await getBusinessSummary(businessId);
        setMetrics({
          reviewCount: response.data.review_count,
          averageRating: response.data.average_rating,
          sentimentScore: response.data.overall_sentiment_score,
          mostMentionedTopic: response.data.most_mentioned_topic || "None"
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching business summary:", err);
        setError("Failed to load performance data");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [businessId, propMetrics]);

  const formatSentiment = (score: number) => {
    return `${(score)}`;
  };

  const metricCards: PerformanceMetric[] = [
    {
      label: "Review Count",
      value: metrics?.reviewCount.toLocaleString() || "0",
      subtext: "Total reviews",
    },
    {
      label: "Average Rating",
      value: metrics?.averageRating ? `${metrics.averageRating.toFixed(1)}` : "0.0",
      subtext: "Out of 5 stars"
    },
    {
      label: "Sentiment Score",
      value: metrics?.sentimentScore ? formatSentiment(metrics.sentimentScore) : "0",
      subtext: "All"
    },
    {
      label: "Most Mentioned",
      value: metrics?.mostMentionedTopic || "No data",
      subtext: "Top customer topic"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm shadow-orange gray-border">
      <div className="flex flex-col justify-start items-start mb-6">
        <h2 className="text-xl font-medium text-coolgray">Performance Summary</h2>
        <button className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
          View your latest reviews and insights
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-4">
          <p>Loading summary data...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 p-2">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {metricCards.map((metric, index) => (
            <div key={index} className="flex flex-col p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-0.5 h-8 rounded-sm ${
                      metric.label === "Review Count"
                          ? "bg-[#F7671F8C]"
                        : metric.label === "Average Rating"
                          ? "bg-[#D3F1D8]"
                          : metric.label === "Sentiment Score"
                            ? "bg-[#79B1FF]"
                            : "bg-gray-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{metric.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{metric.subtext}</p>
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-500">
                  {/* TODO implement placeholder */}
                  ↑ 0% 
                </div>
              </div>

              <p className="text-3xl text-gray-900 mt-3">{metric.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceSummary;
