const express = require("express");
const { submitMessage, getMessages, deleteMessage } = require("../controllers/contactController.js");
const { protect } = require("../middleware/authMiddleware.js");

const contactRouter = express.Router();

// Public routes
contactRouter.post("/", submitMessage);

// Admin routes
contactRouter.get("/", protect, getMessages);
contactRouter.delete("/:id", protect, deleteMessage);

module.exports = {contactRouter};
