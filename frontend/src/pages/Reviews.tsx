import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus, logout } from "../utils/authUtils";
import { UserData } from "../types";
import axios from "axios";
import { API_URL } from "../../config";
import ReviewComponent from "../components/ReviewComponent";

interface Review {
  id: number;
  username: string;
  review_date: string;
  content: string;
  rating: number;
  topics?: string;
  sentiment_score: number;
  sentiment_description: string;
}

function Reviews() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  // Filter States
  const [reviewerType, setReviewerType] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [sentimentFilter, setSentimentFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await checkAuthStatus();
        if (!user) {
          navigate("/login");
          return;
        }
        setUserData(user);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to verify authentication:", error);
        setError("Authentication failed. Please try logging in again.");
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userData || !userData.businesses || userData.businesses.length === 0) return;
      const businessId = userData.businesses[0].id;
      setReviewsLoading(true);
      setReviewsError(null);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/dashboard/business/${businessId}/reviews/recent?limit=100`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReviews(response.data.reviews);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setReviewsError(err.response?.data?.error || "Failed to load reviews.");
        } else {
          setReviewsError("Failed to load reviews.");
        }
      } finally {
        setReviewsLoading(false);
      }
    };

    if (userData) {
      fetchReviews();
    }
  }, [userData]);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  };

  // Filter the reviews
  const filteredReviews = reviews.filter((review) => {
    const isTrusted = review.sentiment_description.toLowerCase() === "positive";
    const reviewerMatch =
      reviewerType === "all" ||
      (reviewerType === "trusted" && isTrusted) ||
      (reviewerType === "regular" && !isTrusted);

    const reviewDate = new Date(review.review_date);
    const now = new Date();
    const dateMatch =
      dateRange === "all" ||
      (dateRange === "month" &&
        reviewDate >= new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())) ||
      (dateRange === "year" &&
        reviewDate >= new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()));

    const starMatch =
      selectedStars === null || Math.round(review.rating) === selectedStars;

    const sentimentMatch =
      sentimentFilter === "all" ||
      review.sentiment_description.toLowerCase() === sentimentFilter;

    return reviewerMatch && dateMatch && starMatch && sentimentMatch;
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading reviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-xl text-red-600 font-semibold p-4 bg-red-50 rounded-lg">
          {error}
          <div className="mt-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-coolgray font-medium ">
          {userData && userData.businesses && userData.businesses.length > 0
            ? userData.businesses[0].name
            : "Business Name"}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Reviews</h2>
        <p className="text-gray-600 mb-6">Here you can view and manage your reviews.</p>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          {/* Reviewer Type */}
          <select
            value={reviewerType}
            onChange={(e) => setReviewerType(e.target.value)}
            className="border border-[#D9D9D9] pr-10 pl-3 py-0.5 rounded-4xl text-[14px] appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/203/203484.png')] bg-no-repeat bg-[right_0.85rem_center] bg-[length:0.8rem]"

          >
            <option value="all">All Reviewers</option>
            <option value="trusted">Trusted</option>
            <option value="regular">Regular</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-[#D9D9D9] pr-10 pl-3 py-0.5 rounded-4xl text-[14px] appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/203/203484.png')] bg-no-repeat bg-[right_0.85rem_center] bg-[length:0.8rem]"

          >
            <option value="all">All Time</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>

          {/* Star Rating */}
          <select
            value={selectedStars ?? ""}
            onChange={(e) =>
              setSelectedStars(e.target.value ? parseInt(e.target.value) : null)
            }
            className="border border-[#D9D9D9] pr-10 pl-3 py-0.5 rounded-4xl text-[14px] appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/203/203484.png')] bg-no-repeat bg-[right_0.85rem_center] bg-[length:0.8rem]"

          >
            <option value="">All Ratings</option>
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          {/* Sentiment */}
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="border border-[#D9D9D9] pr-10 pl-3 py-0.5 rounded-4xl text-[14px] appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/203/203484.png')] bg-no-repeat bg-[right_0.85rem_center] bg-[length:0.8rem]"

          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        {/* Reviews Section */}
        {userData && userData.businesses && userData.businesses.length > 0 ? (
          <div className="mt-6 space-y-6">
            {/* <p className="font-medium mb-4">Reviews for {userData.businesses[0].name}</p> */}

            {reviewsLoading ? (
              <p className="text-gray-500">Loading reviews...</p>
            ) : reviewsError ? (
              <p className="text-red-500">{reviewsError}</p>
            ) : filteredReviews.length === 0 ? (
              <p className="text-gray-500">No reviews found.</p>
            ) : (
              filteredReviews.map((review) => (
                <ReviewComponent
                  key={review.id}
                  reviewerName={review.username}
                  date={new Date(review.review_date).toLocaleDateString()}
                  content={review.content}
                  rating={Math.round(review.rating)}
                  tags={review.topics ? review.topics.split(",").map((tag) => tag.trim()) : []}
                  trusted={review.sentiment_description.toLowerCase() === "positive"}
                  sentiment={review.sentiment_description}
                />
              ))
            )}
          </div>
        ) : (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">No business or reviews found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
