const express = require("express");
const upload = require("../config/multer.js");
const { protect } = require("../middleware/authMiddleware.js");
const {
  getServices,
  createService,
  updateService,
  deleteService
} = require("../controllers/serviceController.js");

const serviceRouter = express.Router();

// Public route
serviceRouter.get("/", getServices);

// Admin routes
serviceRouter.post("/", protect, createService);
serviceRouter.put("/:id", protect, updateService);
serviceRouter.delete("/:id", protect, deleteService);

module.exports = {serviceRouter};