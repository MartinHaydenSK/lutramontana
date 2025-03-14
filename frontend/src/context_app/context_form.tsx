import React, { createContext } from "react";
import { ReactNode } from "react";
import { useState } from "react";

interface formLayout {
  dateStart: Date | undefined;
  setDateStart: React.Dispatch<React.SetStateAction<Date | undefined>>;
  dateEnd: Date | undefined;
  setDateEnd: React.Dispatch<React.SetStateAction<Date | undefined>>;
  numberOfGuests: string;
  setNumberOfGuests: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phonenumber: string;
  setPhonenumber: React.Dispatch<React.SetStateAction<string>>;
  street: string;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
  town: string;
  setTown: React.Dispatch<React.SetStateAction<string>>;
  psc: string;
  setPsc: React.Dispatch<React.SetStateAction<string>>;
  additionalNeeds: string;
  setAdditionalNeeds: React.Dispatch<React.SetStateAction<string>>;
  resetKey: number;
  setResetKey: React.Dispatch<React.SetStateAction<number>>;
}

export const contextForm = createContext<formLayout | undefined>(undefined);

export const ContextFormProvider = ({ children }: { children: ReactNode }) => {
  const [dateStart, setDateStart] = useState<Date | undefined>(undefined);
  const [dateEnd, setDateEnd] = useState<Date | undefined>(undefined);
  const [numberOfGuests, setNumberOfGuests] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [town, setTown] = useState<string>("");
  const [psc, setPsc] = useState<string>("");
  const [additionalNeeds, setAdditionalNeeds] = useState<string>("");
  const [resetKey, setResetKey] = useState<number>(0);
  return (
    <contextForm.Provider
      value={{
        dateStart,
        setDateStart,
        dateEnd,
        setDateEnd,
        numberOfGuests,
        setNumberOfGuests,
        email,
        setEmail,
        phonenumber,
        setPhonenumber,
        street,
        setStreet,
        town,
        setTown,
        psc,
        setPsc,
        additionalNeeds,
        setAdditionalNeeds,
        name,
        setName,
        surname,
        setSurname,
        resetKey,
        setResetKey,
      }}
    >
      {children}
    </contextForm.Provider>
  );
};
