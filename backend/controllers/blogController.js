const Blog = require("../models/blogModel");

// GET all blogs (public)
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single blog by slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE blog (admin)
const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    let thumbnail = "";
    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      thumbnail
    });

    await newBlog.save();

    res.json({
      message: "Blog created successfully",
      blog: newBlog
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE blog
const updateBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    let updatedData = { title, content, category };

    if (req.file) {
      updatedData.thumbnail = `/uploads/${req.file.filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Blog updated",
      blog: updated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE blog
const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog}