const express = require("express");
const upload = require("../config/multer.js");
const { protect } = require("../middleware/authMiddleware.js");
const { 
  getBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require("../controllers/blogController.js");

const blogRouter = express.Router();

// Public blog routes
blogRouter.get("/", getBlogs);
blogRouter.get("/:slug", getBlogBySlug);

// Admin routes
blogRouter.post("/", protect, upload.single("thumbnail"), createBlog);
blogRouter.put("/:id", protect, upload.single("thumbnail"), updateBlog);
blogRouter.delete("/:id", protect, deleteBlog);

module.exports = blogRouter;