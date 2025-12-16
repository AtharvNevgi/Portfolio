// import express from "express";
const express = require("express");
const { registerAdmin, loginAdmin, changePassword } = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// One-time use to create the first admin
// router.post("/register", registerAdmin);

// Admin login
router.post("/login", loginAdmin);

// Change login password
router.put("/change-password", protect, changePassword);

// Protected test route
router.get("/check", protect, (req, res) => {
  res.json({ message: "Token valid. Admin authenticated!" });
});

module.exports = {router};
