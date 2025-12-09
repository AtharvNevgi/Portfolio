const Testimonial = require("../models/testimonialModel");

// GET all testimonials (public)
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE testimonial (admin)
const createTestimonial = async (req, res) => {
  try {
    const { name, role, message } = req.body;

    let profileImage = "";
    if (req.file) {
      profileImage = `/uploads/${req.file.filename}`;
    }

    const newTestimonial = new Testimonial({
      name,
      role,
      message,
      profileImage
    });

    await newTestimonial.save();

    res.json({
      message: "Testimonial added",
      testimonial: newTestimonial
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { name, role, message } = req.body;

    let updatedData = { name, role, message };

    if (req.file) {
      updatedData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Testimonial updated",
      testimonial: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE testimonial
const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial}