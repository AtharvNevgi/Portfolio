const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    default: ""   // e.g., Beginner, Intermediate, Advanced
  },
  icon: {
    type: String,
    default: ""   // optional image/icon
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Skill =  mongoose.model("Skill", skillSchema);

module.exports = Skill