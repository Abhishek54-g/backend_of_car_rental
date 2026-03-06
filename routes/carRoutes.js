const express = require("express");
const { getCars, addCar, deleteCar, getCarById } = require("../controller/carController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", protect, admin, addCar);
router.delete("/:id", protect, admin, deleteCar);

console.log(addCar)
console.log(protect)
console.log(admin)

module.exports = router;
