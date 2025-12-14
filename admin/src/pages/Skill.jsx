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
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Skills</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-10">

          <input
            type="text"
            name="name"
            placeholder="Skill Name (e.g. React)"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="text"
            name="level"
            placeholder="Level (Beginner / Intermediate / Advanced)"
            value={formData.level}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            {editId ? "Update Skill" : "Add Skill"}
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

        {/* Skills List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{skill.name}</h2>
                {skill.level && (
                  <p className="text-sm text-gray-600">{skill.level}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(skill)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(skill._id)}
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