import React from "react";
import { useContext } from "react";
import { contextForm } from "../../../context_app/context_form";

interface emailPhoneNumberProps {
  emailError: string | undefined;
  phonenumberError: string | undefined;
}
const EmailPhoneNumber: React.FC<emailPhoneNumberProps> = ({
  emailError,
  phonenumberError,
}) => {
  const context = useContext(contextForm);

  const { email, setEmail, phonenumber, setPhonenumber } = context!;
  return (
    <>
      <div className="row">
        <span>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-message-form">{emailError}</p>}
        </span>
      </div>
      <div className="row">
        <span>
          <label htmlFor="phonenumber">Telefonné číslo:</label>
          <input
            type="number"
            id="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          {phonenumberError && (
            <p className="error-message-form">{phonenumberError}</p>
          )}
        </span>
      </div>
    </>
  );
};

export default EmailPhoneNumber;
