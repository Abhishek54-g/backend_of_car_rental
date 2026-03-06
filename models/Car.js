const mongoose = require("mongoose")

const carSchema = mongoose.Schema({
  name: String,
  brand: String,
  type: String,
  fuelType: String,
  seats: Number,
  pricePerDay: Number,
  image: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model("Car", carSchema);
