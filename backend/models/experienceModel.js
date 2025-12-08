const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  duration: {
    type: String,
    required: true
    // Example: "Jan 2023 - Present"
  },

  description: {
    type: String,
    default: ""
  },

  logo: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience