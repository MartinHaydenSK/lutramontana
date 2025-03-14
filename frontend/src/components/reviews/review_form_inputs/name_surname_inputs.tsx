import React from "react";
import { useContext } from "react";
import { reviewContext } from "../../../context_app/context_reviews";
interface nameSurnameProps {
  nameError: string | undefined;
  surnameError: string | undefined;
}
const NameSurnameReview: React.FC<nameSurnameProps> = ({
  nameError,
  surnameError,
}) => {
  const context = useContext(reviewContext);
  const { name, setName, surname, setSurname } = context!;
  return (
    <div className="row">
      <span>
        <label htmlFor="name">
          Meno: <i>(nepovinné)</i>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="error-message-form">{nameError}</p>}
      </span>
      <span>
        <label htmlFor="surName">
          Priezvisko: <i>(nepovinné)</i>
        </label>
        <input
          type="text"
          id="surName"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        {surnameError && <p className="error-message-form">{surnameError}</p>}
      </span>
    </div>
  );
};

export default NameSurnameReview;
