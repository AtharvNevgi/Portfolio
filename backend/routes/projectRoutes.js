const express = require("express");
const upload = require("../config/multer.js");
const {protect} = require("../middleware/authMiddleware.js");
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController.js");

const projectRouter = express.Router();

// Public route
projectRouter.get("/", getProjects);

// Admin routes
projectRouter.post("/", protect, upload.array("images", 5), createProject);
projectRouter.put("/:id", protect, upload.array("images", 5), updateProject);
projectRouter.delete("/:id", protect, deleteProject);

module.exports = {projectRouter};