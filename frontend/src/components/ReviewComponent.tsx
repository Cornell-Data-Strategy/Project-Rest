import { FC } from "react";

interface ReviewComponentProps {
  reviewerName: string;
  date: string;
  content: string;
  rating: number; // 1–5
  tags?: string[];
  trusted?: boolean;
  sentiment?: string; // positive | neutral | negative
}

const ReviewComponent: FC<ReviewComponentProps> = ({
  reviewerName,
  date,
  content,
  rating,
  tags = [],
  trusted = false,
  sentiment = "neutral",
}) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1.5 mt-0">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`${
              i < rating ? "text-orange-500" : "text-gray-300"
            } text-3xl`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const getBorderColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "border-[#228B22]";
      case "neutral":
        return "border-[#505050]";
      case "negative":
        return "border-[#EA580B]";
      default:
        return "border-gray-300";
    }
  };

  const getReviewerLabelColor = (trusted: boolean, sentiment: string) => {
    if (trusted) {
      if (sentiment.toLowerCase() === "positive") return "text-[#228B22]";
      if (sentiment.toLowerCase() === "negative") return "text-red-600";
    }
    return "text-[#505050]";
  };

  return (
    <div
      className={`border rounded-xl px-6 py-4.5 bg-white shadow-sm w-full ${getBorderColor(
        sentiment
      )}`}
    >
      {/* Top row: Name, Date, Title */}
      <div className="flex justify-between items-start flex-wrap gap-y-1 mb-2">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
          <span className="text-2xl font-normal text-black">{reviewerName}</span>
          <span className="pt-0.5 text-xl">{date}</span>
        </div>

        <div className="flex items-center gap-4 mt-1 sm:mt-0">
          <span className="bg-orange-100 text-orange-800 text-s font-medium px-3 py-0.5 rounded-3xl">
            Overall
          </span>
          {renderStars(rating)}
        </div>
      </div>

      {/* Review content */}
      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-4">
        {content}
      </p>

      {/* Bottom row: Reviewer label on left, Tags and Button on right */}
      <div className="flex justify-between items-center flex-wrap gap-y-2">
        <p
          className={`font-semibold text-sm ${getReviewerLabelColor(
            trusted,
            sentiment
          )}`}
        >
          {trusted ? "Trusted Reviewer" : "Regular Reviewer"}
        </p>

        <div className="flex items-center gap-3 flex-wrap justify-end">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}

          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 rounded flex items-center gap-1">
            ✨ Generate AI Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
