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
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold mb-5">Edit About Section</h1>

        <form className="space-y-5 max-w-xl" onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Your Name / Title"
            value={aboutData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <textarea
            name="description"
            rows="4"
            placeholder="Enter description"
            value={aboutData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          ></textarea>
          <p className="text-sm text-gray-500 font-medium">{`Last Updated on: ${aboutData.updatedAt.substring(0, 10)}`}</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}