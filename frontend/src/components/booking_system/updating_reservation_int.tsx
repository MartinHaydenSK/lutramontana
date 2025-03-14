import React from "react";
import Calendar from "./day_picker.";
import FormUpdate from "./form_update";
import { contextForm } from "../../context_app/context_form";
import { contexetMessagesBackend } from "../../context_app/context_messages_from_backend";
import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const UpdatingReservationInt: React.FC = () => {
  //Data from url
  const [searchParams] = useSearchParams();
  const [reservationId, setReservationId] = useState<string | undefined>();

  //Redirecting
  const redirectToHome = useNavigate();

  //context
  const context = useContext(contextForm);
  const contextAlertMessage = useContext(contexetMessagesBackend);
  const { setDateStart, setDateEnd } = context!;
  const { setEmailResponse } = contextAlertMessage!;
  useEffect(() => {
    const reservationId = searchParams.get("reservationId");
    const dateStart = searchParams.get("dateStart");
    const dateEnd = searchParams.get("dateEnd");
    const message = searchParams.get("message");
    if (reservationId && dateStart && dateEnd && message === "ok") {
      setReservationId(reservationId);
      setDateStart(new Date(dateStart));
      setDateEnd(new Date(dateEnd));
    } else if (message === "Rezervácia bola zrušená") {
      setEmailResponse(message);
      redirectToHome("/");
    } else if (!reservationId || dateStart || dateEnd || message) {
      setEmailResponse("Nemáte oprávnenie na vstup do danej časti stránky!");
      redirectToHome("/");
    }
  }, []);
  return (
    <section className="update-reservation-interface">
      <Calendar reservationId={reservationId} />
      <FormUpdate reservationId={reservationId} />
    </section>
  );
};

export default UpdatingReservationInt;
