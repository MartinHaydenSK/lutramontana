import React from "react";
import { useContext } from "react";
import { contextForm } from "../../../context_app/context_form";

interface numberOfGuestsProps {
  numberOfGuestsError: string | undefined;
}
const NumberOfGuests: React.FC<numberOfGuestsProps> = ({
  numberOfGuestsError,
}) => {
  const context = useContext(contextForm);

  const { numberOfGuests, setNumberOfGuests } = context!;
  return (
    <div className="row">
      <span>
        <label htmlFor="numberOfGuests">Počet osôb:</label>
        <input
          type="number"
          id="numberOfGuests"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
        {numberOfGuestsError && (
          <p className="error-message-form">{numberOfGuestsError}</p>
        )}
      </span>
    </div>
  );
};

export default NumberOfGuests;
