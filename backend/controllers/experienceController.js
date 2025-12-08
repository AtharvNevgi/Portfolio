const Experience = require("../models/experienceModel");

// GET all experiences (public)
const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort({ createdAt: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE experience (admin)
const createExperience = async (req, res) => {
  try {
    const { role, company, duration, description } = req.body;

    let logo = "";
    if (req.file) {
      logo = `/uploads/${req.file.filename}`;
    }

    const newExp = new Experience({
      role,
      company,
      duration,
      description,
      logo
    });

    await newExp.save();

    res.json({
      message: "Experience added successfully",
      experience: newExp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE experience
const updateExperience = async (req, res) => {
  try {
    const { role, company, duration, description } = req.body;

    let updatedData = { role, company, duration, description };

    if (req.file) {
      updatedData.logo = `/uploads/${req.file.filename}`;
    }

    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Experience updated successfully",
      experience: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE experience
const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getExperience, createExperience, updateExperience, deleteExperience}