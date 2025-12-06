const About = require("../models/aboutModel.js");

// GET About (public)
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE or CREATE About (Admin Only)
const updateAbout = async (req, res) => {
  try {
    const { title, description } = req.body;
    let updateData = { title, description, updatedAt: Date.now() };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    let about = await About.findOne();

    // If no about exists, create new
    if (!about) {
      about = new About(updateData);
      await about.save();
      return res.json({ message: "About section created", about });
    }

    // Update existing
    about = await About.findOneAndUpdate({}, updateData, { new: true });

    res.json({ message: "About section updated", about });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {getAbout, updateAbout};