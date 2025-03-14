import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { contexetMessagesBackend } from "../../context_app/context_messages_from_backend";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const AlertMessage: React.FC = () => {
  const contextAlertMessage = useContext(contexetMessagesBackend);
  const { emailResponse, setEmailResponse } = contextAlertMessage!;
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("message")) {
      const message = searchParams.get("message");
      if (message !== "ok") {
        setEmailResponse(`${message}`);
      }
    }
  }, []);

  useEffect(() => {
    if (emailResponse && location.pathname !== "/aktualizovanieRezervacie") {
      setTimeout(() => {
        setEmailResponse(undefined);
        setSearchParams({}, { replace: true });
      }, 9000);
    }
  }, [emailResponse]);
  return (
    <>
      {emailResponse &&
        emailResponse !==
          "Rezervácia bola zrušená, preto ju nemôžete aktualizovať" && (
          <p className="alert-message">{emailResponse}</p>
        )}
    </>
  );
};

export default AlertMessage;
