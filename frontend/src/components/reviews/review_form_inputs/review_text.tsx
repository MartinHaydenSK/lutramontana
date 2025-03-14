import React from "react";
import { useContext } from "react";
import { reviewContext } from "../../../context_app/context_reviews";

interface ReviewTextProps {
  reviewTextError: string | undefined;
}
const ReviewText: React.FC<ReviewTextProps> = ({ reviewTextError }) => {
  const context = useContext(reviewContext);
  const { reviewText, setReviewText } = context!;
  return (
    <div className="row">
      <span>
        <label htmlFor="additionalTextt">Napíšte nám vašu skúsenosť:</label>
        <textarea
          id="additionalTextt"
          rows={9}
          maxLength={350}
          placeholder="Napíšte recenziu (max. 350 znakov)"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        {reviewTextError && (
          <p className="error-message-form">{reviewTextError}</p>
        )}
      </span>
    </div>
  );
};

export default ReviewText;
