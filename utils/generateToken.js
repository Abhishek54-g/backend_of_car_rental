const jwt = require("jsonwebtoken");


const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in .env file");
  }


  return jwt.sign(
    { id, role },                  // payload
    process.env.JWT_SECRET,        // secret key
    { expiresIn: "7d" }            // token expiry
  );
};

module.exports = generateToken;