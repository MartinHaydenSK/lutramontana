import React from "react";
import { useContext } from "react";
import { contextForm } from "../../../context_app/context_form";
const PlaceOfLiving: React.FC = () => {
  const context = useContext(contextForm);

  const { street, setStreet, town, setTown, psc, setPsc } = context!;
  return (
    <>
      <div className="row">
        <span>
          <label htmlFor="street">Ulica a č*:</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </span>
      </div>
      <div className="row">
        <span>
          <label htmlFor="town">Mesto*:</label>
          <input
            type="text"
            id="town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
        </span>
        <span>
          <label htmlFor="psc">PSČ*:</label>
          <input
            type="text"
            id="psc"
            value={psc}
            onChange={(e) => setPsc(e.target.value)}
          />
        </span>
      </div>
    </>
  );
};

export default PlaceOfLiving;
