import React from "react";
import DateRange from "./form_inputs/date_range";
import NumberOfGuests from "./form_inputs/number_of_guests";
import NameSurname from "./form_inputs/name_surname";
import EmailPhoneNumber from "./form_inputs/email_phonenumber";
import PlaceOfLiving from "./form_inputs/place_of_living";
import AdditionalNeeds from "./form_inputs/additional_needs";
import { useContext, useState } from "react";
import { contextForm } from "../../context_app/context_form";
import { useRef } from "react";
import axios from "axios";

interface FormProps {
  reservationId: string | undefined;
}
const Form: React.FC<FormProps> = () => {
  const context = useContext(contextForm);
  const {
    dateStart,
    dateEnd,
    numberOfGuests,
    name,
    surname,
    email,
    phonenumber,
    street,
    town,
    psc,
    additionalNeeds,
    setResetKey,
    setDateStart,
    setDateEnd,
    setNumberOfGuests,
    setName,
    setSurname,
    setEmail,
    setPhonenumber,
    setStreet,
    setTown,
    setPsc,
    setAdditionalNeeds,
  } = context!;

  //Reference
  const emailFormResponseRef = useRef<HTMLParagraphElement>(null);

  //Axios variabels for reaceaving data
  const [emailResponse, setEmailResponse] = useState<string>("");
  const [emailResponseError, setEmailResponseError] = useState<any>(undefined);

  //Errors form

  const [dateStartError, setDateStartError] = useState<string | undefined>(
    undefined
  );
  const [dateEndError, setDateEndError] = useState<string | undefined>(
    undefined
  );
  const [numberOfGuestsError, setNumberOfGuestsError] = useState<
    string | undefined
  >(undefined);
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [surnameError, setSurnameError] = useState<string | undefined>(
    undefined
  );
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [phonenumberError, setPhonenumberError] = useState<string | undefined>(
    undefined
  );

  //Regex testing variables

  const nameRegex = /\d/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    setDateStartError(undefined);
    setDateEndError(undefined);
    setNumberOfGuestsError(undefined);
    setNameError(undefined);
    setSurnameError(undefined);
    setEmailError(undefined);
    setPhonenumberError(undefined);
    let hasError = false;
    if (!dateStart) {
      setDateStartError("Musíte vybrať dátum príchodu");
      hasError = true;
    }
    if (!dateEnd) {
      setDateEndError("Musíte vybrať dátum odchodu");
      hasError = true;
    }
    if (!numberOfGuests) {
      setNumberOfGuestsError("Musíte vybrať počet hostí");
      hasError = true;
    } else if (Number(numberOfGuests) <= 0) {
      setNumberOfGuestsError("Počet hostí musí byť väčší ako 0");
      hasError = true;
    }
    if (!name) {
      setNameError("Musíte zadať meno");
      hasError = true;
    } else if (nameRegex.test(name)) {
      setNameError("Meno musia tvoriť len písmena");
      hasError = true;
    }
    if (!surname) {
      setSurnameError("Musíte vybrať dátum príchodu");
      hasError = true;
    } else if (nameRegex.test(surname)) {
      setSurnameError("Priezvisko musia tvoriť len písmena");
      hasError = true;
    }
    if (!email) {
      setEmailError("Musíte zadať email");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Musíte zadať správnu formu e-mailu");
      hasError = true;
    }
    if (!phonenumber) {
      setPhonenumberError("Musíte zadať telefonné číslo");
      hasError = true;
    }

    return hasError;
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) return;

    const dataForm = {
      dateStart,
      dateEnd,
      numberOfGuests,
      name,
      surname,
      email,
      phonenumber,
      street,
      town,
      psc,
      additionalNeeds,
    };
    try {
      setEmailResponseError(undefined);
      const response = await axios.post(
        "api/reservation-confirmation",
        dataForm
      );
      const responseData = response.data;
      if (responseData) {
        setEmailResponse(responseData);
        setDateStart(undefined);
        setDateEnd(undefined);
        setNumberOfGuests("");
        setName("");
        setSurname("");
        setEmail("");
        setPhonenumber("");
        setTown("");
        setStreet("");
        setPsc("");
        setAdditionalNeeds("");
        setResetKey((prev) => prev + 1);
        emailFormResponseRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      setEmailResponseError(error);
    }
  };

  return (
    <div>
      <form>
        <span>
          {emailResponseError && (
            <p className="sending-email-error">
              Chyba pri odosielaní emailu {emailResponseError.message},
              kontaktuje majiteľa
            </p>
          )}
          {emailResponse && (
            <p
              className="sending-email-response"
              ref={emailFormResponseRef}
              id="sending-email-response"
            >
              {emailResponse}
            </p>
          )}

          <p>
            <strong>Časti označené znakom * sú nepovinné</strong>
          </p>
        </span>
        <article>
          <DateRange
            dateStartError={dateStartError}
            dateEndError={dateEndError}
          />
          <NumberOfGuests numberOfGuestsError={numberOfGuestsError} />
          <NameSurname nameError={nameError} surnameError={surnameError} />
          <EmailPhoneNumber
            emailError={emailError}
            phonenumberError={phonenumberError}
          />
          <PlaceOfLiving />
          <AdditionalNeeds />
        </article>
        <button onClick={(e) => sendEmail(e)}>Poslať email</button>
      </form>
    </div>
  );
};

export default Form;
