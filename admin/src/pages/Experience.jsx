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
          <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
            <Sidebar />

            <div className="ml-64 p-12 w-full max-w-5xl">
              {/* Header */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-5 mb-12">
                <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
                  Experience
                </h1>
                <p className="text-gray-600 font-medium">Manage your professional work experience</p>
              </div>

              {/* Add/Edit Experience Form */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 mb-12">
                <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800 tracking-wide">Role</label>
                    <input
                      type="text"
                      name="role"
                      placeholder="Role (e.g. Software Developer)"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800 tracking-wide">Company</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-800 tracking-wide">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        placeholder="Duration (e.g. Jan 2023 - Present)"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-800 tracking-wide">Description</label>
                      <textarea
                        name="description"
                        placeholder="Description (optional)"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm resize-vertical focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300 md:col-span-2"
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button 
                      type="submit"
                      className="flex-1 group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-transparent hover:from-blue-700 hover:to-indigo-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {editId ? "Update Experience" : "Add Experience"}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

              {/* Experience List */}
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div
                    key={exp._id}
                    className="group bg-white/80 backdrop-blur-xl hover:bg-white/95 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 p-8 transform transition-all duration-300 hover:-translate-y-2 hover:border-gray-200/50 cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-3 h-3 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                            {exp.role}
                          </h2>
                        </div>
                        
                        <p className="text-xl font-semibold text-gray-800 mb-2">{exp.company}</p>
                        
                        <div className="inline-flex items-center gap-2 mb-6 bg-linear-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-2xl">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-lg font-medium text-gray-700">{exp.duration}</p>
                        </div>

                        {exp.description && (
                          <p className="text-gray-700 text-lg leading-relaxed bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                            {exp.description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={() => handleEdit(exp)}
                          className="px-6 py-3 text-sm font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exp._id)}
                          className="px-6 py-3 text-sm font-semibold bg-linear-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 active:scale-95 focus:ring-4 focus:ring-red-200/50 transform transition-all duration-300 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  );
}