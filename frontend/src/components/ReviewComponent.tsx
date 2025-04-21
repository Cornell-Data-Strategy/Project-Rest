import { FC } from "react";

interface ReviewComponentProps {
  reviewerName: string;
  date: string;
  title: string;
  content: string;
  rating: number; // 1–5
  tags?: string[];
  trusted?: boolean;
}

const ReviewComponent: FC<ReviewComponentProps> = ({
  reviewerName,
  date,
  title,
  content,
  rating,
  tags = [],
  trusted = false,
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

  return (
    <div className="border border-orange-300 rounded-xl px-6 py-4.5 bg-white shadow-sm w-full max-w-4xl">
      {/* Top row: Name, Date, Meal Type, Title */}
      <div className="flex justify-between items-start flex-wrap gap-y-1 mb-2">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
          <span className="text-2xl font-normal text-black">{reviewerName}</span>
          <span className="pt-0.5 ">{date}</span>
          <span className="font-semibold text-black ml-4 mt-0.5">
            TITLE: <span className="font-bold">{title}</span>
          </span>
        </div>

        <div className="flex items-center gap-4 mt-1 sm:mt-0">
          <span className="bg-orange-100 text-orange-800 text-s font-medium px-3 py-0.5 rounded-3xl">Overall</span>
          {renderStars(rating)}
        </div>
      </div>

      {/* Review content */}
      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-4">{content}</p>

      {/* Bottom row: Trusted Reviewer on left, Tags + Button on right */}
      <div className="flex justify-between items-center flex-wrap gap-y-2">
        {trusted && (
          <p className="text-green-600 font-semibold text-sm">Trusted Reviewer</p>
        )}

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
