import { createContext, useState } from "react";
import { ReactNode } from "react";

interface calendarContextProps {
  dateStart: Date | undefined;
  dateEnd: Date | undefined;
  setDateStart: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setDateEnd: React.Dispatch<React.SetStateAction<Date | undefined>>;
}
export const calendarContext = createContext<calendarContextProps | undefined>(
  undefined
);

export const CalendarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dateStart, setDateStart] = useState<Date | undefined>(undefined);
  const [dateEnd, setDateEnd] = useState<Date | undefined>(undefined);

  return (
    <calendarContext.Provider
      value={{ dateStart, dateEnd, setDateEnd, setDateStart }}
    >
      {children}
    </calendarContext.Provider>
  );
};
