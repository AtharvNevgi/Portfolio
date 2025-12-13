const Skill = require("../models/skillModel.js");

// Get all skills (public)
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a skill (admin)
// const createSkill = async (req, res) => {
//   try {
//     const { name, level } = req.body;

//     let icon = "";
//     if (req.file) {
//       icon = `/uploads/${req.file.filename}`;
//     }

//     const newSkill = new Skill({ name, level, icon });
//     await newSkill.save();

//     res.json({ message: "Skill added", skill: newSkill });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const createSkill = async (req, res) => {
  try {
    const { name, level } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Skill name is required" });
    }

    const skill = await Skill.create({
      name,
      level
    });

    res.status(201).json({
      message: "Skill added successfully",
      skill
    });

  } catch (error) {
    console.error("CREATE SKILL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a skill
// const updateSkill = async (req, res) => {
//   try {
//     const { name, level } = req.body;

//     let updatedData = { name, level };

//     if (req.file) {
//       updatedData.icon = `/uploads/${req.file.filename}`;
//     }

//     const updatedSkill = await Skill.findByIdAndUpdate(
//       req.params.id,
//       updatedData,
//       { new: true }
//     );

//     res.json({ message: "Skill updated", skill: updatedSkill });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const updateSkill = async (req, res) => {
  try {
    const { name, level } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Skill name is required" });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, level },
      { new: true }
    );

    res.json({
      message: "Skill updated successfully",
      skill: updatedSkill
    });

  } catch (error) {
    console.error("UPDATE SKILL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a skill
const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {getSkills, createSkill, updateSkill, deleteSkill}