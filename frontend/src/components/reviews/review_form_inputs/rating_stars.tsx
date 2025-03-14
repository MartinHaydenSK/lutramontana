import React from "react";
import { Rating } from "react-simple-star-rating";
import { useContext } from "react";
import { reviewContext } from "../../../context_app/context_reviews";
const RatingStarts: React.FC = () => {
  const context = useContext(reviewContext);
  const { starRating, setStarRating } = context!;

  const handleRating = (rate: number) => {
    setStarRating(rate);
  };

  return (
    <div className="rating-stars">
      <span>
        <Rating
          onClick={handleRating}
          initialValue={starRating}
          allowFraction
        />
      </span>
    </div>
  );
};

export default RatingStarts;
