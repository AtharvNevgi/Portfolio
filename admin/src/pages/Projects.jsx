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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
              title: "Updated Successfully!",
              text: "Your Project section has been saved.",
              showConfirmButton: false,
              timer: 1900
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


  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>

        {/* Add Project Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mb-10">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows="3"
            required
          />

          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (comma separated)"
            value={formData.techStack}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            type="text"
            name="githubLink"
            placeholder="GitHub Link"
            value={formData.githubLink}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            type="text"
            name="liveLink"
            placeholder="Live Link"
            value={formData.liveLink}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            Add Project
          </button> */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            {editId ? "Update Project" : "Add Project"}
          </button>

        </form>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border p-4 rounded flex justify-between items-start"
            >
              <div>
                <h2 className="font-bold text-lg">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>

                <p className="text-sm mt-2">
                  <strong>Tech:</strong>{" "}
                  {project.techStack?.join(", ")}
                </p>
                <p className="text-sm mt-2">
                  <strong>githubLink:</strong>{" "}
                  {project.githubLink}
                </p>
                <p className="text-sm mt-2">
                  <strong>liveLink:</strong>{" "}
                  {project.liveLink}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
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