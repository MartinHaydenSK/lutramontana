import React, { useContext, useEffect, useState } from "react";
import { contextForm } from "../../context_app/context_form";
import { DayPicker } from "react-day-picker";
import axios from "axios";
import { sk } from "date-fns/locale";

interface CalendarProps {
  reservationId: string | undefined;
}
const Calendar: React.FC<CalendarProps> = ({ reservationId }) => {
  //Interfaces
  interface DateRange {
    from: Date;
    to: Date;
  }

  interface ReservedRange {
    reservationId: string;
    dateStart: Date;
    dateEnd: Date;
    email: string;
  }

  //context
  const context = useContext(contextForm);
  const {
    setDateStart,
    setDateEnd,
    dateEnd,
    dateStart,
    resetKey,
    setResetKey,
  } = context!;

  //ENV
  const apiURL = import.meta.env.VITE_API;

  //Variabels daypicker
  const [countClicks, setCountClicks] = useState<number>(0);
  const [reservations, setReservations] = useState<DateRange[] | undefined>(
    undefined
  );
  const [startingReservations, setStartingReservations] = useState<Date[]>();
  const [endingReservations, setEndingReservations] = useState<Date[]>();
  const [modifiers] = useState<{ [key: string]: string }>({
    selected: "rdp-selected",
    booked: "booked",
    bookedStartingReservations: "bookedStartingReservations",
    bookedEndingReservations: "bookedEndingReservations",
  });
  const [reservationsError, setReservationsError] = useState<any>(undefined);
  const [month, setMonth] = useState<Date>(new Date());

  //Functions
  const handleDatePick = (date: Date, modifiers: any) => {
    if (
      !modifiers.booked ||
      !modifiers.bookedStartingReservations ||
      !modifiers.bookedEndingReservations
    ) {
      setMonth(new Date(date.getFullYear(), date.getMonth()));

      if (countClicks === 0 && !dateStart && !dateEnd) {
        setDateStart(date);
        setDateEnd(date);
      } else if (
        countClicks === 0 &&
        date.getTime() === dateStart?.getTime() &&
        date.getTime() === dateEnd?.getTime()
      ) {
        setDateEnd(undefined);
        setDateStart(undefined);
      } else if (date.getTime() <= dateStart!.getTime()) {
        setMonth(new Date(date.getFullYear(), date.getMonth()));

        setCountClicks(0);
        setDateStart(date);
        const isIncluded = reservations?.filter((item) => {
          const itemFrom = new Date(item.from);
          const itemTo = new Date(item.to);
          return (
            itemFrom.getTime() >= dateStart!.getTime() &&
            date.getTime() >= itemTo.getTime()
          );
        });
        if (isIncluded?.length !== 0) {
          if (date.getTime() === dateStart!.getTime()) {
            if (countClicks === 1) {
              setDateEnd(undefined);
              setDateStart(undefined);

              setCountClicks(0);
            } else {
              setDateEnd(date);
              setCountClicks(1);
            }
          }
        } else {
          setDateStart(date);
          setDateEnd(date);
          setResetKey((prev) => prev + 1);
          if (date.getTime() === dateStart!.getTime()) {
            if (countClicks === 1) {
              setDateEnd(undefined);
              setDateStart(undefined);
              setCountClicks(0);
            } else {
              setDateStart(date);
              setDateEnd(date);
              setCountClicks(1);
            }
          }
        }
      } else if (date.getTime() >= dateStart!.getTime()) {
        setMonth(new Date(date.getFullYear(), date.getMonth()));

        setCountClicks(0);
        const isIncluded = reservations?.filter((item) => {
          const itemFrom = new Date(item.from); // Konverzia na Date
          const itemTo = new Date(item.to);
          return (
            itemFrom.getTime() >= dateStart!.getTime() &&
            date.getTime() >= itemTo.getTime()
          );
        });

        if (isIncluded?.length !== 0) {
          if (date.getTime() === dateEnd?.getTime()) {
            if (countClicks === 1) {
              setDateEnd(undefined);
              setDateStart(undefined);
              setCountClicks(0);
            } else {
              setCountClicks(1);
              setDateStart(date);
            }
          } else {
            setDateStart(date);
            setDateEnd(date);

            setResetKey((prev) => prev + 1);
          }
        } else {
          setDateEnd(date);

          if (date.getTime() === dateEnd?.getTime()) {
            if (countClicks === 1) {
              setDateEnd(undefined);
              setDateStart(undefined);
              setCountClicks(0);
            } else {
              setCountClicks(1);
              setDateStart(date);
            }
          }
        }
      } else {
        setMonth(new Date(date.getFullYear(), date.getMonth()));
        setDateEnd(date);
      }
    }
  };
  const handleChangeMonth = (month: Date) => {
    setMonth(month);
  };
  const setDisabled = (date: Date) => {
    const isIncluded = reservations?.filter((item) => {
      const itemFrom = new Date(item.from);
      const itemTo = new Date(item.to);
      return (
        date.getTime() < itemTo.getTime() && date.getTime() > itemFrom.getTime()
      );
    });

    const arrayOfAllDates = reservations?.flatMap((reservation) => [
      new Date(reservation.from),
      new Date(reservation.to),
    ]);

    const count =
      arrayOfAllDates?.filter((day) => day.getTime() === date.getTime())
        .length || 0;

    if (isIncluded?.length !== 0) {
      return true;
    } else if (count >= 2) {
      return true;
    } else {
      return false;
    }
  };
  const getReservations = async () => {
    try {
      const response = await axios.get(`${apiURL}/reservations`, {
        withCredentials: true,
      });
      const data = response.data;

      if (data) {
        const dayPickerReservations: DateRange[] = data.map(
          (data: ReservedRange): DateRange => ({
            from: data.dateStart,
            to: data.dateEnd,
          })
        );

        if (dayPickerReservations) {
          const arrayOfStartingDates: Date[] = [];
          const arrayOfEndingDate: Date[] = [];
          const mappingStartingDates = dayPickerReservations.map((object) => {
            arrayOfStartingDates.push(new Date(object.from));
          });
          const mappingEndingDates = dayPickerReservations.map((object) => {
            arrayOfEndingDate.push(new Date(object.to));
          });
          if (mappingEndingDates && mappingStartingDates) {
            setStartingReservations(arrayOfStartingDates);
            setEndingReservations(arrayOfEndingDate);
          }
          setReservations(dayPickerReservations);
        }
      }
    } catch (error) {
      setReservationsError(error);
    }
  };
  const getReservationsUpdate = async () => {
    try {
      const response = await axios.get(`${apiURL}/reservations`);
      const data = response.data;

      if (data) {
        const dayPickerReservations: DateRange[] = data.map(
          (data: ReservedRange): DateRange => ({
            from: new Date(data.dateStart),
            to: new Date(data.dateEnd),
          })
        );

        if (dayPickerReservations) {
          const dayPickerFilteredReservations = dayPickerReservations.filter(
            (object) =>
              object.from.getDate() !== dateStart?.getDate() &&
              object.to.getDate() !== dateEnd?.getDate()
          );

          const arrayOfStartingDates: Date[] = [];
          const arrayOfEndingDate: Date[] = [];
          const mappingStartingDates = dayPickerFilteredReservations.map(
            (object) => {
              arrayOfStartingDates.push(new Date(object.from));
            }
          );
          const mappingEndingDates = dayPickerFilteredReservations.map(
            (object) => {
              arrayOfEndingDate.push(new Date(object.to));
            }
          );
          if (mappingEndingDates && mappingStartingDates) {
            setStartingReservations(arrayOfStartingDates);
            setEndingReservations(arrayOfEndingDate);
          }
          setReservations(dayPickerFilteredReservations);
          setResetKey((prev) => prev + 1);
        }
      }
    } catch (error) {
      setReservationsError(error);
    }
  };
  const reset = () => {
    setDateStart(undefined);
    setDateEnd(undefined);
    setResetKey((prev) => prev + 1);
  };

  //UseEffects
  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => {
    if (reservationId) {
      getReservationsUpdate();
    }
  }, [reservationId]);

  const today = new Date();
  return (
    <div className="calendar">
      <span>
        <div>
          <span className="color-description-calendar">
            <div></div>
            <p>Obsadený dátum</p>
          </span>
          <span className="color-description-calendar">
            <div></div>
            <p>Vybratý dátum</p>
          </span>
        </div>
      </span>

      {reservationsError && (
        <p className="sending-email-error">
          {reservationsError.message}, kontaktuje majiteľa
        </p>
      )}
      <DayPicker
        key={resetKey}
        mode="range"
        locale={sk}
        numberOfMonths={1}
        selected={
          dateStart && !dateEnd
            ? { from: dateStart, to: dateStart }
            : dateStart && dateEnd
            ? { from: dateStart, to: dateEnd }
            : undefined
        }
        modifiers={{
          selected: (date) => date >= dateStart! && date <= dateEnd!,
          booked: reservations,
          bookedStartingReservations: startingReservations,
          bookedEndingReservations: endingReservations,
        }}
        month={month}
        onMonthChange={handleChangeMonth}
        startMonth={new Date(today.getFullYear(), today.getMonth(), 1)}
        disabled={setDisabled}
        modifiersClassNames={modifiers}
        onDayClick={(day, modifiers) => handleDatePick(day, modifiers)}
        footer={<button onClick={reset}>Resetovať</button>}
      />
    </div>
  );
};

export default Calendar;
