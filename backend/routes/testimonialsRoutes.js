const express = require("express");
const upload = require("../config/multer.js");
const { protect } = require("../middleware/authMiddleware.js");
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require("../controllers/testimonialController.js");

const testimonialRouter = express.Router();

// Public
testimonialRouter.get("/", getTestimonials);

// Admin routes
testimonialRouter.post("/", protect, createTestimonial);
testimonialRouter.put("/:id", protect, updateTestimonial);
testimonialRouter.delete("/:id", protect, deleteTestimonial);

module.exports = {testimonialRouter};