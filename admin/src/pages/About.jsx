import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function About() {
  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    updatedAt: ""
  });

  // Fetch existing about info
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get("/about");
        setAboutData({
          title: res.data.title || "",
          description: res.data.description || "",
          updatedAt : res.data.updatedAt ||""
        });
      } catch (err) {
        console.log("Error fetching about:", err);
      }
    };

    fetchAbout();
  }, []);

  // Update text inputs
  const handleChange = (e) => {
    setAboutData({
      ...aboutData,
      [e.target.name]: e.target.value,
    });
  };

  // Send update request (JSON only)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(aboutData)
    try {
      const res = await API.put("/about", aboutData);
      // alert("About updated successfully!");
      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        text: "Your About section has been saved.",
        showConfirmButton: false,
        timer: 1200
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <Sidebar />

      <div className="ml-64 p-12 w-full max-w-4xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-5 mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
            Edit About Section
          </h1>
          <p className="text-gray-600 font-medium">Update your personal information below</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800 tracking-wide">Title / Name</label>
            <input
              type="text"
              name="title"
              placeholder="Your Name / Title"
              value={aboutData.title}
              onChange={handleChange}
              className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800 tracking-wide">Description</label>
            <textarea
              name="description"
              rows="6"
              placeholder="Enter your description..."
              value={aboutData.description}
              onChange={handleChange}
              className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm resize-vertical focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-medium bg-gray-100/50 px-4 py-2 rounded-xl">
              Last Updated on: {aboutData.updatedAt.substring(0, 10)}
            </p>
            <button 
              type="submit"
              className="group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-transparent hover:from-blue-700 hover:to-indigo-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Save Changes
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}