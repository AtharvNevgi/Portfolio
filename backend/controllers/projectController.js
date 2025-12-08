const Project = require("../models/projectModel");

// GET all projects (public)
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE project (admin only)
const createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink } = req.body;

    let images = [];
    if (req.files) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const newProject = new Project({
      title,
      description,
      techStack: techStack ? techStack.split(",") : [],
      githubLink,
      liveLink,
      images
    });

    await newProject.save();

    res.json({
      message: "Project created successfully",
      project: newProject
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE project
const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink } = req.body;

    let updatedData = {
      title,
      description,
      techStack: techStack ? techStack.split(",") : [],
      githubLink,
      liveLink
    };

    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map(
        (file) => `/uploads/${file.filename}`
      );
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Project updated successfully",
      project: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE project
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject}