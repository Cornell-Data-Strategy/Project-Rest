import React from "react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const Star = ({ filled }: { filled: number }) => (
  <svg
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <defs>
      <linearGradient id={`starGrad${filled}`}>
        <stop offset={`${filled * 100}%`} stopColor="#EA580B" />
        <stop offset={`${filled * 100}%`} stopColor="#E5E7EB" />
      </linearGradient>
    </defs>
    <path
      d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
      fill={
        filled === 1
          ? "#EA580B"
          : filled === 0
          ? "#E5E7EB"
          : `url(#starGrad${filled})`
      }
    />
  </svg>
);

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = maxStars - fullStars - (partialStar > 0 ? 1 : 0);


  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} filled={1} />);
  }


  if (partialStar > 0) {
    stars.push(<Star key="partial" filled={partialStar} />);
  }

 
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} filled={0} />);
  }

  return <div className="inline-flex gap-1">{stars}</div>;
};

export default StarRating;
