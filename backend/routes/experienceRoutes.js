const express = require("express");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware.js");
const { 
  getExperience, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} = require("../controllers/experienceController.js");

const experienceRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Public route
experienceRouter.get("/", getExperience);

// Admin routes
experienceRouter.post("/", protect, upload.single("logo"), createExperience);
experienceRouter.put("/:id", protect, upload.single("logo"), updateExperience);
experienceRouter.delete("/:id", protect, deleteExperience);

module.exports = {experienceRouter};
