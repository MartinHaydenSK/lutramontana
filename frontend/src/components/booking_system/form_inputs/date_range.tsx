import React, { useContext } from "react";
import { format } from "date-fns";
import { contextForm } from "../../../context_app/context_form";

interface dateRangeProps {
  dateStartError: string | undefined;
  dateEndError: string | undefined;
}
const DateRange: React.FC<dateRangeProps> = ({
  dateStartError,
  dateEndError,
}) => {
  const context = useContext(contextForm);
  const { dateStart, dateEnd } = context!;

  const formatDate = (date: Date | undefined) => {
    if (!date) {
      return "";
    } else {
      return format(date, "dd.MM.yyyy");
    }
  };

  return (
    <div className="row">
      <span>
        <label htmlFor="dayOfArrival">Dátum príchodu:</label>
        <input
          type="text"
          id="dayOfArrival"
          readOnly
          value={formatDate(dateStart)}
        />
        {dateStartError && (
          <p className="error-message-form">{dateStartError}</p>
        )}
      </span>
      <span>
        <label htmlFor="dayOfDeparture">Dátum odchodu:</label>
        <input
          type="text"
          id="dayOfDeparture"
          readOnly
          value={formatDate(dateEnd)}
        />
        {dateEndError && <p className="error-message-form">{dateEndError}</p>}
      </span>
    </div>
  );
};

export default DateRange;
