/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    level: "",
  });

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const res = await API.get("/skill");
      setSkills(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update skill
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/skill/${editId}`, formData);
      } else {
        await API.post("/skill", formData);
      }

      setFormData({
        name: "",
        level: "",
      });
      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your Skill has been saved.",
        showConfirmButton: false,
        timer: 1200
      });
      setEditId(null);
      fetchSkills();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // Edit skill
  const handleEdit = (skill) => {
    setEditId(skill._id);
    setFormData({
      name: skill.name,
      level: skill.level || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete skill
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await API.delete(`/skill/${id}`);
      fetchSkills();
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
        level: "",
    });
    fetchSkills();
  }

  return (
        <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
          <Sidebar />

          <div className="ml-64 p-12 w-full max-w-4xl">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-5 mb-12">
              <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Skills
              </h1>
              <p className="text-gray-600 font-medium">Manage your technical skills and proficiency levels</p>
            </div>

            {/* Add/Edit Skill Form */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 mb-12">
              <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800 tracking-wide">Skill Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Skill Name (e.g. React)"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800 tracking-wide">Proficiency Level</label>
                  <input
                    type="text"
                    name="level"
                    placeholder="Beginner / Intermediate / Advanced"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <button 
                    type="submit"
                    className="flex-1 group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-transparent hover:from-blue-700 hover:to-indigo-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {editId ? "Update Skill" : "Add Skill"}
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

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="group bg-white/80 backdrop-blur-xl hover:bg-white/95 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 p-8 transform transition-all duration-300 hover:-translate-y-2 hover:border-gray-200/50 cursor-pointer w-65"
                >
                  <div className="flex justify-between items-center h-full">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {skill.name}
                      </h2>
                      {skill.level && (
                        <div className="inline-flex items-center gap-2">
                          <div className="w-3 h-3 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                          <p className="text-lg font-semibold text-gray-700">{skill.level}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap ml-4 sm:flex-row gap-3">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="px-6 py-3 text-sm font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="px-4 py-3 text-sm font-semibold bg-linear-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 active:scale-95 focus:ring-4 focus:ring-red-200/50 transform transition-all duration-300 cursor-pointer"
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