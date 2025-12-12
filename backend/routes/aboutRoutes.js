const express = require("express")
const {getAbout, updateAbout} = require("../controllers/aboutController.js")
const {protect} = require("../middleware/authMiddleware.js")

const aboutRouter = express.Router();

// Public route → anyone can view About
aboutRouter.get("/", getAbout);

// Admin route → Protected
aboutRouter.put("/", protect, updateAbout);

module.exports = {aboutRouter};