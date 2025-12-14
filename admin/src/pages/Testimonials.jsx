/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
  });

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/testimonials/${editId}`, formData);
      } else {
        await API.post("/testimonials", formData);
      }

      setFormData({
        name: "",
        role: "",
        message: "",
      });
      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your Testimonials has been saved.",
        showConfirmButton: false,
        timer: 1200
      });
      setEditId(null);
      fetchTestimonials();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setEditId(testimonial._id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role || "",
      message: testimonial.message,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      await API.delete(`/testimonials/${id}`);
      fetchTestimonials();
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
        name: "",
        role: "",
        message: "",
    });
    fetchTestimonials();
  }

  return (
      <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
        <Sidebar />

        <div className="ml-64 p-12 w-full max-w-5xl">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-5 mb-12">
            <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
              Testimonials
            </h1>
            <p className="text-gray-600 font-medium">
              Manage client feedback and testimonials displayed on your portfolio
            </p>
          </div>

          {/* Add / Edit Testimonial Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 mb-12">
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">
                  Person Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Person Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">
                  Role / Company (optional)
                </label>
                <input
                  type="text"
                  name="role"
                  placeholder="Role / Company (optional)"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">
                  Testimonial Message
                </label>
                <textarea
                  name="message"
                  placeholder="Testimonial Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm resize-vertical focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-transparent hover:from-blue-700 hover:to-indigo-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {editId ? "Update Testimonial" : "Add Testimonial"}
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

          {/* Testimonials List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="group bg-white/80 backdrop-blur-xl hover:bg-white/95 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 p-8 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-2 hover:border-purple-200/60 cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-sm">
                        {t.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                        {t.name}
                      </h2>
                      {t.role && (
                        <p className="text-xs font-medium text-gray-500 mt-0.5">
                          {t.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed bg-linear-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100 group-hover:shadow-md transition-all duration-300">
                    “{t.message}”
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => handleEdit(t)}
                    className="px-5 py-2.5 text-xs font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
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