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
    // console.log("BODY RECEIVED:", req.body);

    const { title, description, techStack, githubLink, liveLink } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const project = await Project.create({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
    });

    res.status(201).json(project);

  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// UPDATE project
const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const updatedData = {
      title,
      description,
      techStack: Array.isArray(techStack)
        ? techStack
        : techStack?.split(",").map(t => t.trim()),
      githubLink,
      liveLink,
    };

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Project updated successfully",
      project: updated,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
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