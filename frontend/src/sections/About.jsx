import { useEffect, useState } from "react";
import API from "../api/axios";

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get("/about");
        setAbout(res.data);
      } catch (error) {
        console.error("Failed to fetch about data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 lg:py-32 bg-linear-to-b from-slate-900 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 mb-8">
            <span className="w-2.5 h-2.5 bg-blue-400 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-slate-300">About Me</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-200 to-white bg-clip-text text-transparent leading-tight max-w-2xl mx-auto">
            A bit more about my journey
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-10 lg:p-12 border border-slate-700/50">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
              {about?.title || "Title of the About"}
            </h3>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              {about?.description || "About information will be updated soon."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}