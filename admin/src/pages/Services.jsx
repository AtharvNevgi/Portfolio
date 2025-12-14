/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function Services() {
  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update service
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/services/${editId}`, formData);
      } else {
        await API.post("/services", formData);
      }

      setFormData({
        title: "",
        description: "",
      });

      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your Services has been saved.",
        showConfirmButton: false,
        timer: 1200
      });
      setEditId(null);
      fetchServices();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // Edit service
  const handleEdit = (service) => {
    setEditId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await API.delete(`/services/${id}`);
      fetchServices();
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
        description: "",
    });
    fetchServices();
  }
  
  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <Sidebar />

      <div className="ml-64 p-12 w-full max-w-5xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-5 mb-12">
          <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
            Services
          </h1>
          <p className="text-gray-600 font-medium">Manage your professional services and offerings</p>
        </div>

        {/* Add/Edit Service Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 mb-12">
          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800 tracking-wide">Service Title</label>
              <input
                type="text"
                name="title"
                placeholder="Service Title"
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
                placeholder="Service Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm resize-vertical focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
                rows="5"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button 
                type="submit"
                className="flex-1 group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-transparent hover:from-blue-700 hover:to-indigo-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {editId ? "Update Service" : "Add Service"}
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white/80 backdrop-blur-xl hover:bg-white/95 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 p-6 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200/50 cursor-pointer"
            >
              {/* Top: icon + title + description */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {service.title}
                  </h2>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed bg-linear-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100 group-hover:shadow-md transition-all duration-300">
                  {service.description}
                </p>
              </div>

              {/* Bottom: buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => handleEdit(service)}
                  className="px-5 py-2.5 text-sm font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="px-5 py-2.5 text-sm font-semibold bg-linear-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 active:scale-95 focus:ring-4 focus:ring-red-200/50 transform transition-all duration-300 cursor-pointer"
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