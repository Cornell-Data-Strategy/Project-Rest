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

interface DashboardProps {
  userData: UserData | null;
}

interface DashboardData {
  reviewCount: number;
  averageRating: number;
  sentimentScore: number;
  mostMentionedTopic: string;

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
    reviewCount: 1353,
    averageRating: 4.2,
    sentimentScore: 8.9,
    mostMentionedTopic: "Service",

    sentimentData: [], // TODO: Add sample data
    recentReviews: [], // TODO: Add sample data

    ratingsDistribution: [
      { rating: 5, count: 500, percentage: 45 },
      { rating: 4, count: 300, percentage: 27 },
      { rating: 3, count: 150, percentage: 14 },
      { rating: 2, count: 100, percentage: 9 },
      { rating: 1, count: 50, percentage: 5 },
    ],

    reviewSegments: [
      // todo
    ],

    criticalReviews: [], // TODO: Add sample data

    topicRatings: [
      // todo
    ],

    aiInsights: [], // TODO: Add sample data
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // TODO: Load your dashboard data here and update setDashboardData
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userData) {
      loadDashboardData();
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
          <PerformanceSummary metrics={dashboardData} />

          {/* First Row: Ratings Distribution and Review Segmentation */}
          <div className="grid grid-cols-2 gap-8">
          
            <SentimentAnalysis data={dashboardData.sentimentData} />
            <RecentReviews reviews={dashboardData.recentReviews} />
          </div>

          {/* Second Row: Sentiment Analysis and Recent Reviews */}
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




          {/* Fourth Row: AI Insights (Full Width) */}
          <div className="w-full flex flex-col gap-8">
            <TopicRatings ratings={dashboardData.topicRatings} />
            <AIInsights insights={dashboardData.aiInsights} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
