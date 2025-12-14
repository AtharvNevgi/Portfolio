/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/project");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add project
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      techStack: formData.techStack.split(",").map(t => t.trim()),
    };

    try {
      if (editId) {
        // UPDATE
        await API.put(`/project/${editId}`, payload);
      } else {
        // CREATE
        await API.post("/project", payload);
      }

      setFormData({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
      });

      setEditId(null);
      Swal.fire({
              icon: "success",
              title: "Saved Successfully!",
              text: "Your Project section has been saved.",
              showConfirmButton: false,
              timer: 1200
            });
      fetchProjects();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };


  // Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await API.delete(`/project/${id}`);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setEditId(project._id);

    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "),
      githubLink: project.githubLink || "",
      liveLink: project.liveLink || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
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
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
      });

      fetchProjects();
  }

  return (
      <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
        <Sidebar />

        <div className="ml-64 p-12 w-full max-w-6xl">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-5 mb-12">
            <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
              Projects
            </h1>
            <p className="text-gray-600 font-medium">Manage your portfolio projects</p>
          </div>

          {/* Add/Edit Project Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 mb-12">
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">Project Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">Description</label>
                <textarea
                  name="description"
                  placeholder="Project Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm resize-vertical focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800 tracking-wide">Tech Stack</label>
                  <input
                    type="text"
                    name="techStack"
                    placeholder="Tech Stack (comma separated)"
                    value={formData.techStack}
                    onChange={handleChange}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800 tracking-wide">GitHub Link</label>
                  <input
                    type="text"
                    name="githubLink"
                    placeholder="GitHub Link"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 tracking-wide">Live Link</label>
                <input
                  type="text"
                  name="liveLink"
                  placeholder="Live Link"
                  value={formData.liveLink}
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
                    {editId ? "Update Project" : "Add Project"}
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

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group bg-white/80 backdrop-blur-xl hover:bg-white/95 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 p-8 transform transition-all duration-300 hover:-translate-y-2 hover:border-gray-200/50"
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                        <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">Tech Stack</p>
                        <p className="text-sm font-medium text-gray-900">{project.techStack?.join(", ")}</p>
                      </div>
                      
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-linear-to-r from-gray-50 to-gray-100 p-4 rounded-2xl border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex items-center gap-3 group/link"
                        >
                          <svg className="w-5 h-5 text-gray-600 group-hover/link:text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.088 3.176.768.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-sm font-medium text-gray-900 group-hover/link:text-black">GitHub</span>
                        </a>
                      )}
                      
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-linear-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100 hover:bg-emerald-100 hover:shadow-md transition-all duration-300 flex items-center gap-3 group/link"
                        >
                          <svg className="w-5 h-5 text-emerald-600 group-hover/link:text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900 group-hover/link:text-black">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-6 py-3 text-sm font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
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