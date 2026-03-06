const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, question } = req.body;

    if (!firstName || !lastName || !email || !question) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      question,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact };