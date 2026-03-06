const Car = require("../models/Car");

// GET ALL
const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD CAR
const addCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE CAR
const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCars,
  getCarById,
  addCar,
  deleteCar,
};