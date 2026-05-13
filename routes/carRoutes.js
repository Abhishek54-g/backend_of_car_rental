const express = require("express");
const {
  getCars,
  addCar,
  deleteCar,
  getCarById,
} = require("../controllers/carController");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware"); // ✅ सही import

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", protect, admin, addCar);   // ✅ अब सही
router.delete("/:id", protect, admin, deleteCar);

module.exports = router;
