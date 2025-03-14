import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateRange from "./form_inputs/date_range";
import { useContext, useState } from "react";
import { contextForm } from "../../context_app/context_form";
import { contexetMessagesBackend } from "../../context_app/context_messages_from_backend";
import axios from "axios";

interface FormUpdateProps {
  reservationId: string | undefined;
}
const FormUpdate: React.FC<FormUpdateProps> = ({ reservationId }) => {
  //Navigation
  const backToHome = useNavigate();
  //Context
  const context = useContext(contextForm);
  const contextAlertMessage = useContext(contexetMessagesBackend);

  //Axios variabels for reaceaving data
  const { dateStart, dateEnd, setDateStart, setDateEnd } = context!;
  const { emailResponse, setEmailResponse } = contextAlertMessage!;
  const [emailResponseError, setEmailResponseError] = useState<any>(undefined);
  const [enableUpdate, setEnableUpdate] = useState<boolean>(false);

  //Errors form
  const [weHaveError, setWeHaveWrror] = useState<boolean>(false);
  const [dateStartError, setDateStartError] = useState<string | undefined>(
    undefined
  );
  const [dateEndError, setDateEndError] = useState<string | undefined>(
    undefined
  );

  const apiURL = import.meta.env.VITE_API;

  const updateReservation = async (e: any) => {
    e.preventDefault();
    setDateStartError(undefined);
    setDateEndError(undefined);
    setWeHaveWrror(false);
    if (!dateStart) {
      setWeHaveWrror(true);
      setDateStartError("Musíte vybrať dátum príchodu");
    }
    if (!dateEnd) {
      setDateEndError("Musíte vybrať dátum odchodu");
      setWeHaveWrror(true);
    }

    if (!weHaveError && dateStart && dateEnd && reservationId) {
      console.log("fired fetch", weHaveError);
      const dataForm = {
        reservationId,
        dateStart,
        dateEnd,
      };
      try {
        setEmailResponseError(undefined);
        const response = await axios.post(
          `${apiURL}/update-reservation`,
          dataForm
        );
        console.log(response.status);
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData) {
            setDateStart(undefined);
            setDateEnd(undefined);
            setEmailResponse(responseData);
            backToHome("/");
          }
        } else {
          const responseData = response.data;
          setEmailResponse(responseData);
        }
      } catch (error) {
        setEmailResponseError(error);
      }
    }
  };
  useEffect(() => {
    if (
      contextAlertMessage?.emailResponse ===
      "Rezervácia bola zrušená, preto ju nemôžete aktualizovať"
    ) {
      console.log("changed");
      setEnableUpdate(true);
    }
  }, [contextAlertMessage?.emailResponse]);

  return (
    <>
      <form>
        <h2>Aktualizovanie rezervácie</h2>
        {emailResponseError && (
          <p className="sending-email-error">
            Chyba pri odosielaní emailu{emailResponseError.message}
          </p>
        )}
        {emailResponse && (
          <p className="sending-email-error">{emailResponse}</p>
        )}
        <article>
          <DateRange
            dateStartError={dateStartError}
            dateEndError={dateEndError}
          />
        </article>
        {!enableUpdate && (
          <button onClick={(e) => updateReservation(e)} disabled={enableUpdate}>
            Aktualizovať rezerváciu
          </button>
        )}
        <button
          onClick={(e: React.FormEvent) => {
            e.preventDefault();
            window.location.reload();
          }}
        >
          Odznova
        </button>
      </form>
    </>
  );
};

export default FormUpdate;
