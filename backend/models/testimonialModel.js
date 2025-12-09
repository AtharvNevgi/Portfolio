const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: ""
  },

  message: {
    type: String,
    required: true
  },

  profileImage: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Testimonial =  mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial