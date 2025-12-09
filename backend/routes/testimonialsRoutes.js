const express = require("express");
const multer = require("multer")
const { protect } = require("../middleware/authMiddleware.js");
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require("../controllers/testimonialController.js");

const testimonialRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Public
testimonialRouter.get("/", getTestimonials);

// Admin routes
testimonialRouter.post("/", protect, upload.single("profileImage"), createTestimonial);
testimonialRouter.put("/:id", protect, upload.single("profileImage"), updateTestimonial);
testimonialRouter.delete("/:id", protect, deleteTestimonial);

module.exports = {testimonialRouter};
