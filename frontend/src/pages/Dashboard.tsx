import "../App.css";
import { useState, useEffect } from "react";
import { UserData } from "../types";
import Header from "../components/header";
import PerformanceSummary from "../components/PerformanceSummary";
import SentimentAnalysis from "../components/SentimentAnalysis";
import RecentReviews from "../components/RecentReviews";
import RatingsDistribution from "../components/RatingsDistribution";
import ReviewSegmentation from "../components/ReviewSegmentation";
import CriticalReviews from "../components/CriticalReviews";
import TopicRatings from "../components/TopicRatings";
import AIInsights from "../components/AIInsights";
import { getBusinessSummary } from "../api/endpoints";

interface DashboardProps {
  userData: UserData | null;
}

interface DashboardData {
  reviewCount: number;
  averageRating: number;
  sentimentScore: number;
  mostMentionedTopic: string;

  // Static percentages for metrics until backend supports them
  reviewCountPercentChange: string;
  averageRatingPercentChange: string;
  sentimentScorePercentChange: string;

  // Sentiment Analysis Data
  sentimentData: Array<{ timestamp: string; sentiment: number }>;

  // Recent Reviews Data
  recentReviews: Array<{
    id: string;
    authorName: string;
    date: string;
    content: string;
    rating: number;
    reviewerType: string;
    topics: string[];
  }>;

  // Ratings Distribution Data
  ratingsDistribution: Array<{
    rating: number;
    count: number;
    percentage: number;
  }>;

  // Review Segmentation Data
  reviewSegments: Array<{
    type: string;
    count: number;
    color: string;
    description: string;
  }>;

  // Critical Reviews Data
  criticalReviews: Array<{
    id: string;
    authorName: string;
    date: string;
    rating: number;
    content: string;
    keyIssues: string[];
    response?: {
      date: string;
      content: string;
    };
  }>;

  // Topic Ratings Data
  topicRatings: Array<{
    topic: string;
    rating: number;
    reviewCount: number;
    description: string;
  }>;

  // AI Insights Data
  aiInsights: Array<{
    id: string;
    type: "positive" | "negative" | "neutral" | "suggestion";
    title: string;
    description: string;
    relatedReviews: number;
    date: string;
  }>;
}

function Dashboard({ userData }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    reviewCount: 0,
    averageRating: 0,
    sentimentScore: 0,
    mostMentionedTopic: "",

    // Static percent changes
    reviewCountPercentChange: "↑ 12%",
    averageRatingPercentChange: "↑ 5%",
    sentimentScorePercentChange: "↑ 8%",

    sentimentData: [],
    recentReviews: [],

    ratingsDistribution: [
      { rating: 5, count: 0, percentage: 0 },
      { rating: 4, count: 0, percentage: 0 },
      { rating: 3, count: 0, percentage: 0 },
      { rating: 2, count: 0, percentage: 0 },
      { rating: 1, count: 0, percentage: 0 },
    ],

    reviewSegments: [],
    criticalReviews: [],
    topicRatings: [],
    aiInsights: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userData || !userData.businesses || !userData.businesses[0]) {
        setError("No business data available");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const businessId = userData.businesses[0].id;
        
        // Call your API to fetch data
        const summaryResponse = await getBusinessSummary(businessId);
        console.log("API Response:", summaryResponse.data);
        
        // Update dashboard data with API response
        setDashboardData(prevData => ({
          reviewCount: summaryResponse.data.review_count,
          averageRating: summaryResponse.data.average_rating,
          sentimentScore: summaryResponse.data.overall_sentiment_score,
          mostMentionedTopic: summaryResponse.data.most_mentioned_topic || "None",
          
          // Keep static percent changes for now
          reviewCountPercentChange: prevData.reviewCountPercentChange,
          averageRatingPercentChange: prevData.averageRatingPercentChange,
          sentimentScorePercentChange: prevData.sentimentScorePercentChange,
          
          // Preserve other data that isn't being fetched yet
          sentimentData: prevData.sentimentData,
          recentReviews: prevData.recentReviews,
          ratingsDistribution: prevData.ratingsDistribution,
          reviewSegments: prevData.reviewSegments,
          criticalReviews: prevData.criticalReviews,
          topicRatings: prevData.topicRatings,
          aiInsights: prevData.aiInsights,
        }));
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userData) {
      fetchDashboardData();
    }
  }, [userData]);

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="h-auto w-auto p-6 main-container mx-10 my-4">
        <Header userData={userData} />
        <div className="relative -mx-6">
          <div className="absolute w-full border-b border-2 border-[#D9D9D9]"></div>
        </div>
        <h1 className="mt-10 mb-8 text-4xl text-coolgray font-medium">
          Welcome back, {userData?.first_name} {userData?.last_name}!
        </h1>

        <div className="space-y-8">
          {/* Performance Summary */}
          <PerformanceSummary 
            businessId={userData!.businesses[0]!.id} 
            metrics={{
              reviewCount: dashboardData.reviewCount,
              averageRating: dashboardData.averageRating,
              sentimentScore: dashboardData.sentimentScore,
              mostMentionedTopic: dashboardData.mostMentionedTopic,
              // reviewCountPercentChange: dashboardData.reviewCountPercentChange,
              // averageRatingPercentChange: dashboardData.averageRatingPercentChange,
              // sentimentScorePercentChange: dashboardData.sentimentScorePercentChange
            }} 
          />

          {/* First Row: Sentiment Analysis and Recent Reviews */}
          <div className="grid grid-cols-2 gap-8">
            <SentimentAnalysis data={dashboardData.sentimentData} />
            <RecentReviews businessId={userData!.businesses[0]!.id} />
          </div>

          {/* Second Row: Ratings Distribution and Review Segmentation */}
          <div className="flex gap-4 p-4">
            <div className="flex w-1/2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex-1">
                <RatingsDistribution ratings={dashboardData.ratingsDistribution} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex-1">
                <ReviewSegmentation segments={dashboardData.reviewSegments} />
              </div>
            </div>

            {/* Right Side: Critical Reviews */}
            <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
              <CriticalReviews reviews={dashboardData.criticalReviews} />
            </div>
          </div>

          {/* Fourth Row: Topic Ratings and AI Insights */}
          <div className="w-full flex flex-col gap-8">
            <TopicRatings ratings={dashboardData.topicRatings} />
            <AIInsights 
              insights={dashboardData.aiInsights} 
              businessId={userData!.businesses[0].id} 
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;