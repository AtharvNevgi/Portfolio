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
        text: "Your Skill has been saved.",
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
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Services</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mb-10">

          <input
            type="text"
            name="title"
            placeholder="Service Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Service Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows="3"
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            {editId ? "Update Service" : "Add Service"}
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

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="border p-4 rounded flex justify-between"
            >
              <div>
                <h2 className="font-bold">{service.title}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service._id)}
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