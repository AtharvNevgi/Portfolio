const Service = require("../models/serviceModel");

// GET all services (public)
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE service (admin only)
const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const service = await Service.create({
      title,
      description
    });

    res.status(201).json({
      message: "Service added successfully",
      service
    });

  } catch (error) {
    console.error("CREATE SERVICE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE service
const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    res.json({
      message: "Service updated successfully",
      service: updatedService
    });

  } catch (error) {
    console.error("UPDATE SERVICE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE service
const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getServices, createService, updateService, deleteService}