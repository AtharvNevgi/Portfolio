/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import Swal from "sweetalert2"

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/blogs/${editId}`, formData);
      } else {
        await API.post("/blogs", formData);
      }

      setFormData({
        title: "",
        content: "",
        category: "",
      });
      
      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your Blog has been saved.",
        showConfirmButton: false,
        timer: 1200
      });

      setEditId(null);
      fetchBlogs();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditId(blog._id);
    setFormData({
      title: blog.title,
      content: blog.content,
      category: blog.category || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

    // Cancel Edit
  const cancelEdit = async () => {
    Swal.fire({
        icon: "info",
        title: "Cancel Successfully!",
        showConfirmButton: false,
        timer: 1200
    });
    setEditId(null);
    setFormData({
        title: "",
        content: "",
        category: "",
    });
    fetchBlogs();
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mb-10">

          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (optional)"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <textarea
            name="content"
            placeholder="Blog Content"
            value={formData.content}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows="8"
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            {editId ? "Update Blog" : "Add Blog"}
          </button>
        </form>

        {editId ? 
          (
          <button className="bg-red-600 text-white px-4 py-2 m-4 rounded cursor-pointer" 
            onClick={cancelEdit}
          >
          Cancel
          </button>
          ) : 
          null
        }

        {/* Blog List */}
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border p-4 rounded flex justify-between"
            >
              <div>
                <h2 className="font-bold">{blog.title}</h2>
                <p className="text-sm text-gray-500">
                  Category: {blog.category}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Slug: {blog.slug}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}