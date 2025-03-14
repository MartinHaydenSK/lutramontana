const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewId: { type: String, unique: true },
  name: { type: String },
  surname: { type: String },
  starRating: { type: Number },
  reviewText: { type: String },
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
