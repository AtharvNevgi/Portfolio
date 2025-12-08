const express = require("express")
const {getAbout, updateAbout} = require("../controllers/aboutController.js")
const {protect} = require("../middleware/authMiddleware.js")
const multer = require("multer")

const aboutRouter = express.Router();

// Upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Public route → anyone can view About
aboutRouter.get("/", getAbout);

// Admin route → Protected
aboutRouter.put("/", protect, upload.single("profileImage"), updateAbout);

module.exports = {aboutRouter};
