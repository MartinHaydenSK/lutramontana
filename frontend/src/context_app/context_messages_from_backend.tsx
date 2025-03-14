import React, { ReactNode } from "react";
import { createContext, useState } from "react";

interface messagesFromBackend {
  emailResponse: string | undefined;
  setEmailResponse: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const contexetMessagesBackend = createContext<
  messagesFromBackend | undefined
>(undefined);

export const MessagesFromBackendProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [emailResponse, setEmailResponse] = useState<string | undefined>(
    undefined
  );
  return (
    <contexetMessagesBackend.Provider
      value={{ emailResponse, setEmailResponse }}
    >
      {children}
    </contexetMessagesBackend.Provider>
  );
};
