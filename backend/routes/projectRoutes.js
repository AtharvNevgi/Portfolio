const express = require("express");
const multer = require("multer");
const {protect} = require("../middleware/authMiddleware.js");
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController.js");

const projectRouter = express.Router();

// Multer for multiple images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Public route
projectRouter.get("/", getProjects);

// Admin routes
projectRouter.post("/", protect, upload.array("images", 5), createProject);
projectRouter.put("/:id", protect, upload.array("images", 5), updateProject);
projectRouter.delete("/:id", protect, deleteProject);

module.exports = {projectRouter};
