const express = require("express");
const upload = require("../config/multer.js");
const {protect} = require("../middleware/authMiddleware.js");
const { getSkills, createSkill, updateSkill, deleteSkill } = require("../controllers/skillController.js");

const skillRouter = express.Router();

// Public route - anyone can view skills
skillRouter.get("/", getSkills);

// Admin routes
skillRouter.post("/", protect, upload.single("icon"), createSkill);
skillRouter.put("/:id", protect, upload.single("icon"), updateSkill);
skillRouter.delete("/:id", protect, deleteSkill);

module.exports = {skillRouter};