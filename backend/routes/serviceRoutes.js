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
serviceRouter.post("/", protect, upload.single("icon"), createService);
serviceRouter.put("/:id", protect, upload.single("icon"), updateService);
serviceRouter.delete("/:id", protect, deleteService);

module.exports = {serviceRouter};