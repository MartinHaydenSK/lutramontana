import React, { useContext, createContext, ReactNode, useState } from "react";

interface appState {
  user: string;
  theme: "dark" | "light";
}

interface appContext {
  app: appState;
  setApp: React.Dispatch<React.SetStateAction<appState>>;
}

const AppContext = createContext<appContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [app, setApp] = useState<appState>({
    user: "Guest",
    theme: "dark",
  });

  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
};
