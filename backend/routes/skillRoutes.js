const express = require("express");
const multer = require("multer");
const {protect} = require("../middleware/authMiddleware.js");
const { getSkills, createSkill, updateSkill, deleteSkill } = require("../controllers/skillController.js");

const skillRouter = express.Router();

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Public route - anyone can view skills
skillRouter.get("/", getSkills);

// Admin routes
skillRouter.post("/", protect, upload.single("icon"), createSkill);
skillRouter.put("/:id", protect, upload.single("icon"), updateSkill);
skillRouter.delete("/:id", protect, deleteSkill);

module.exports = {skillRouter};
