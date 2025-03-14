import React, { ReactNode } from "react";
import { createContext } from "react";
import { useState } from "react";

interface reviewFormData {
  starRating: number | undefined;
  setStarRating: React.Dispatch<React.SetStateAction<number | undefined>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  reviewText: string;
  setReviewText: React.Dispatch<React.SetStateAction<string>>;
}

export const reviewContext = createContext<reviewFormData | undefined>(
  undefined
);

const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [starRating, setStarRating] = useState<number | undefined>(0);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  return (
    <reviewContext.Provider
      value={{
        starRating,
        setStarRating,
        name,
        setName,
        surname,
        setSurname,
        reviewText,
        setReviewText,
      }}
    >
      {children}
    </reviewContext.Provider>
  );
};

export default ReviewProvider;
