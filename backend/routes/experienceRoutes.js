const express = require("express");
const upload = require("../config/multer.js");
const { protect } = require("../middleware/authMiddleware.js");
const { 
  getExperience, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} = require("../controllers/experienceController.js");

const experienceRouter = express.Router();

// Public route
experienceRouter.get("/", getExperience);

// Admin routes
experienceRouter.post("/", protect, createExperience);
experienceRouter.put("/:id", protect, updateExperience);
experienceRouter.delete("/:id", protect, deleteExperience);

module.exports = {experienceRouter};