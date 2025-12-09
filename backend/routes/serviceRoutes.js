const express = require("express");
const multer = require("multer")
const { protect } = require("../middleware/authMiddleware.js");
const {
  getServices,
  createService,
  updateService,
  deleteService
} = require("../controllers/serviceController.js");

const serviceRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Public route
serviceRouter.get("/", getServices);

// Admin routes
serviceRouter.post("/", protect, upload.single("icon"), createService);
serviceRouter.put("/:id", protect, upload.single("icon"), updateService);
serviceRouter.delete("/:id", protect, deleteService);

module.exports = {serviceRouter};