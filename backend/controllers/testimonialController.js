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

    if (!name || !message) {
      return res.status(400).json({
        message: "Name and message are required"
      });
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      message
    });

    res.status(201).json({
      message: "Testimonial added successfully",
      testimonial
    });

  } catch (error) {
    console.error("CREATE TESTIMONIAL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { name, role, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        message: "Name and message are required"
      });
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, role, message },
      { new: true }
    );

    res.json({
      message: "Testimonial updated successfully",
      testimonial: updatedTestimonial
    });

  } catch (error) {
    console.error("UPDATE TESTIMONIAL ERROR:", error);
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