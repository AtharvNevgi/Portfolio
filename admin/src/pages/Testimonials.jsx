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
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Testimonials</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mb-10">

          <input
            type="text"
            name="name"
            placeholder="Person Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Role / Company (optional)"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <textarea
            name="message"
            placeholder="Testimonial Message"
            value={formData.message}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows="4"
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            {editId ? "Update Testimonial" : "Add Testimonial"}
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

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="border p-4 rounded flex justify-between"
            >
              <div>
                <h2 className="font-bold">{t.name}</h2>
                {t.role && (
                  <p className="text-sm text-gray-600">{t.role}</p>
                )}
                <p className="text-sm mt-2">{t.message}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(t._id)}
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