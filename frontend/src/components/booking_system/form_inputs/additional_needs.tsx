import React from "react";
import { useContext } from "react";
import { contextForm } from "../../../context_app/context_form";
const AdditionalNeeds: React.FC = () => {
  const context = useContext(contextForm);

  const { additionalNeeds, setAdditionalNeeds } = context!;
  return (
    <>
      <div className="row">
        <span>
          <label htmlFor="additionalTextt">
            V prípade ak máte špeciálne požiadavky tak nám napíšte*:
          </label>
          <textarea
            id="additionalTextt"
            value={additionalNeeds}
            rows={8}
            onChange={(e) => setAdditionalNeeds(e.target.value)}
          ></textarea>
        </span>
      </div>
    </>
  );
};

export default AdditionalNeeds;
