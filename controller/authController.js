const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// REGISTER
const register = async (req, res) => {
  try {
    console.log("Incoming Data", req.body);
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.log("REGISTER ERROR FULL:", error)
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    console.log("Entered Email:", normalizedEmail);

    // Find user in DB
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }

    // Match password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Send response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,   // 👈 role DB se aa raha hai
      token: token,
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { register, login };