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
      <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
        <Sidebar />

        <div className="ml-64 p-12 w-full max-w-6xl">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-5 mb-12">
            <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
              Blog
            </h1>
            <p className="text-gray-600 font-medium">
              Create and manage articles for your portfolio blog
            </p>
          </div>

          {/* Add / Edit Blog Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 mb-12">
            <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">
                  Category (optional)
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Category (optional)"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">
                  Blog Content
                </label>
                <textarea
                  name="content"
                  placeholder="Blog Content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="8"
                  className="w-full px-5 py-4 text-base md:text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm resize-vertical focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-transparent hover:from-blue-700 hover:to-indigo-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {editId ? "Update Blog" : "Add Blog"}
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </button>

                {editId ? (
                  <button
                    onClick={cancelEdit}
                    className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-red-700 active:scale-95 focus:ring-4 focus:ring-red-200/50 transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          {/* Blog List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="group bg-white/80 backdrop-blur-xl hover:bg-white/95 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 p-7 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-2 hover:border-blue-200/60 cursor-pointer"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {blog.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 text-xs mt-1 mb-3">
                    {blog.category && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {blog.category}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7h18M3 12h18M3 17h18"
                        />
                      </svg>
                      <span className="truncate max-w-[140px]">
                        Slug: {blog.slug}
                      </span>
                    </span>
                  </div>

                  {/* Optional preview line if you later add excerpt */}
                  {/* <p className="text-sm text-gray-700 line-clamp-3">
                    {blog.content}
                  </p> */}
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="px-5 py-2.5 text-xs font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-5 py-2.5 text-xs font-semibold bg-linear-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 active:scale-95 focus:ring-4 focus:ring-red-200/50 transform transition-all duration-300 cursor-pointer"
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