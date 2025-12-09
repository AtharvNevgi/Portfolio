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

    let icon = "";
    if (req.file) {
      icon = `/uploads/${req.file.filename}`;
    }

    const newService = new Service({
      title,
      description,
      icon
    });

    await newService.save();

    res.json({
      message: "Service added successfully",
      service: newService
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE service
const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;

    let updatedData = { title, description };

    if (req.file) {
      updatedData.icon = `/uploads/${req.file.filename}`;
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Service updated successfully",
      service: updated
    });

  } catch (error) {
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