const express = require("express");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware.js");
const { 
  getBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require("../controllers/blogController.js");

const blogRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Public blog routes
blogRouter.get("/", getBlogs);
blogRouter.get("/:slug", getBlogBySlug);

// Admin routes
blogRouter.post("/", protect, upload.single("thumbnail"), createBlog);
blogRouter.put("/:id", protect, upload.single("thumbnail"), updateBlog);
blogRouter.delete("/:id", protect, deleteBlog);

module.exports = blogRouter;
