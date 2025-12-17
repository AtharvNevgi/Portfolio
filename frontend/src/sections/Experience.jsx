import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await API.get("/experience");
        setExperiences(res.data || []);
      } catch (error) {
        console.error("Failed to fetch experience", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-24 lg:py-32 bg-linear-to-b from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 mb-8">
            <span className="w-2.5 h-2.5 bg-purple-400 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-slate-300">Experience</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-200 to-white bg-clip-text text-transparent leading-tight max-w-2xl mx-auto">
            My work journey
          </h2>
        </div>

        {/* Experience Content */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-6"></div>
              <p className="text-slate-400 text-lg">Loading experience...</p>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl mb-4">No experience added yet.</p>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl px-12 py-8 border border-slate-700/50 inline-block">
                <span className="text-slate-500 text-sm">Experience will appear here</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Center Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-linear-to-b from-blue-500/30 via-purple-500/30 to-indigo-500/30 h-full"></div>
              
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={exp._id}
                    className={`flex items-start gap-8 lg:gap-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} group`}
                  >
                    {/* Timeline Dot */}
                    <div className="shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-linear-to-r from-purple-500 to-blue-500 rounded-full border-4 border-slate-900/50 shadow-lg z-10 group-hover:scale-110 transition-all duration-300 absolute left-1/2 transform -translate-x-1/2 lg:group-hover:bg-white/50"></div>
                    
                    {/* Content Card */}
                    <div className="flex-1 bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-700/50 group-hover:bg-slate-800/50 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 lg:max-w-md">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-white to-slate-200 bg-clip-text text-transparent">
                          {exp.role}
                        </h3>
                        <div className="bg-linear-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-700/50 text-right">
                          <span className="text-sm font-semibold text-emerald-300">{exp.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-lg font-semibold text-white mb-2">
                        {exp.company}
                      </p>
                      
                      {exp.description && (
                        <p className="text-slate-300 leading-relaxed text-lg">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}