const Contact = require("../models/contactModel");

// Public - Submit contact message
const submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMsg = new Contact({ name, email, message });
    await newMsg.save();

    res.json({ message: "Message sent successfully", data: newMsg });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin - Get all messages
const getMessages = async (req, res) => {
  try {
    const msgs = await Contact.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin - Delete message
const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitMessage, getMessages, deleteMessage}