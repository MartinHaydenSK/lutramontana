const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationId: { type: String, unique: true },
  dateStart: { type: Date },
  dateEnd: { type: Date },
  numberOfGuests: { type: String },
  email: { type: String },
  phonenumber: { type: String },
  name: { type: String },
  surname: { type: String },
  street: { type: String },
  town: { type: String },
  psc: { type: String },
  additionalNeeds: { type: String },
});

const Reservation = mongoose.model("Reservations", reservationSchema);

module.exports = Reservation;
