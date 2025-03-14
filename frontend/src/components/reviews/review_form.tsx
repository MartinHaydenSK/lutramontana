import React, { useEffect, useState } from "react";
import RatingStarts from "./review_form_inputs/rating_stars";
import NameSurnameReview from "./review_form_inputs/name_surname_inputs";
import ReviewText from "./review_form_inputs/review_text";
import { useContext } from "react";
import { reviewContext } from "../../context_app/context_reviews";
import axios from "axios";
const ReviewForm: React.FC = () => {
  const context = useContext(reviewContext);
  const {
    starRating,
    name,
    surname,
    reviewText,

    setName,
    setSurname,
    setReviewText,
  } = context!;

  const [response, setResponse] = useState<string | undefined>(undefined);
  //Error variables
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [surnameError, setSurnameError] = useState<string | undefined>(
    undefined
  );
  const [reviewTextError, setReviewTextError] = useState<string>("");
  const [weHaveError, setWeHaveError] = useState<boolean>(true);

  //Regex
  const nameRegex = /\d/;
  const sendReview = async (e: any) => {
    e.preventDefault();
    setWeHaveError(false);
    setNameError("");
    setSurnameError("");
    setReviewTextError("");

    if (nameRegex.test(name)) {
      setNameError("Meno musia tvoriť len písmena");
      setWeHaveError(true);
    }

    if (nameRegex.test(surname)) {
      setSurnameError("Priezvisko musia tvoriť len písmena");
      setWeHaveError(true);
    }

    if (!reviewText) {
      setWeHaveError(true);
      setReviewTextError("Musíte napísať nejakú správu");
    }
  };

  useEffect(() => {
    sendingEmail();
  }, [weHaveError]);
  const sendingEmail = async () => {
    if (!weHaveError) {
      if (!starRating) {
      }
      const dataBlog = { starRating, name, surname, reviewText };
      const response = await axios.post("/api/sennd-review-email", dataBlog);
      const data = await response.data;
      if (data) {
        setResponse(data);

        setName("");
        setSurname("");
        setReviewText("");
      }
    }
  };
  return (
    <section className="review-form">
      <h1>Napíšte nám receniziu</h1>
      {response && <p className="sending-email-response">{response}</p>}
      <form>
        <RatingStarts />
        <article>
          <NameSurnameReview
            nameError={nameError}
            surnameError={surnameError}
          />
          <ReviewText reviewTextError={reviewTextError} />
        </article>
        <button onClick={(e) => sendReview(e)}>Poslať recenziu</button>
      </form>
    </section>
  );
};

export default ReviewForm;
