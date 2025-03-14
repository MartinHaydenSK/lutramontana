const mongoose = require("mongoose");

const deletedReservationsSchema = new mongoose.Schema({
  deletedReservationId: { type: String, unique: true },
});

const deletedReservationsModel = mongoose.model(
  "deletedReservationsModel",
  deletedReservationsSchema
);

module.exports = deletedReservationsModel;
