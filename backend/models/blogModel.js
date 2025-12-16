const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  slug: {
    type: String,
    unique: true
  },

  content: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "General"
  },

  thumbnail: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-create slug from title
blogSchema.pre("validate", function () {
  if (this.title && !this.slug) {
    this.slug =
      this.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-") +
      "-" +
      Date.now();
  }
});


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog