import React from "react";
import Form from "../booking_system/form";
import Calendar from "../booking_system/day_picker.";
import Footer from "../footer/footer";
const Reservation: React.FC = () => {
  const reservationId = undefined;

  return (
    <>
      {" "}
      <section className="reservation">
        <h2>Rezervujte si pobyt</h2>
        <article className="calendar-and-form">
          <Calendar reservationId={reservationId} />
          <Form reservationId={reservationId} />
        </article>
        <div className="backgound-image"></div>
      </section>
      <Footer />
    </>
  );
};

export default Reservation;
