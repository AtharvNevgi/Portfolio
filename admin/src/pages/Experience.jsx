/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import Swal from "sweetalert2"

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  // Fetch experiences
  const fetchExperiences = async () => {
    try {
      const res = await API.get("/experience");
      setExperiences(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update experience
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/experience/${editId}`, formData);
      } else {
        await API.post("/experience", formData);
      }

      setFormData({
        role: "",
        company: "",
        duration: "",
        description: "",
      });
      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your Experience section has been saved.",
        showConfirmButton: false,
        timer: 1200
      });
      setEditId(null);
      fetchExperiences();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // Edit experience
  const handleEdit = (exp) => {
    setEditId(exp._id);
    setFormData({
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      description: exp.description || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete experience
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;

    try {
      await API.delete(`/experience/${id}`);
      fetchExperiences();
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
        role: "",
        company: "",
        duration: "",
        description: "",
      });
      fetchExperiences();
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Experience</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mb-10">

          <input
            type="text"
            name="role"
            placeholder="Role (e.g. Software Developer)"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. Jan 2023 - Present)"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows="3"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            {editId ? "Update Project" : "Add Project"}
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

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="border p-4 rounded flex justify-between"
            >
              <div>
                <h2 className="font-bold">{exp.role}</h2>
                <p className="text-gray-700">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.duration}</p>

                {exp.description && (
                  <p className="text-sm mt-2">{exp.description}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(exp._id)}
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