import React from "react";
import { useContext } from "react";
import { contextForm } from "../../../context_app/context_form";

interface nameSurnameProps {
  nameError: string | undefined;
  surnameError: string | undefined;
}
const NameSurname: React.FC<nameSurnameProps> = ({
  nameError,
  surnameError,
}) => {
  const context = useContext(contextForm);

  const { name, setName, surname, setSurname } = context!;
  return (
    <div className="row">
      <span>
        <label htmlFor="name">Meno:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="error-message-form">{nameError}</p>}
      </span>
      <span>
        <label htmlFor="surName">Priezvisko:</label>
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

export default NameSurname;
