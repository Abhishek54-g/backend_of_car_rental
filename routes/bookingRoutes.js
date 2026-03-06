const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
} = require("../controller/bookingController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/", protect, admin, getAllBookings);

module.exports = router;