import React from "react";

interface ReviewerSegment {
  type: string;
  count: number;
  color: string;
  description: string;
}

interface ReviewSegmentationProps {
  segments: ReviewerSegment[];
}


const ReviewSegmentation: React.FC<ReviewSegmentationProps> = ({}) => {
  return <>Review Segmentation</>;
};

export default ReviewSegmentation;
