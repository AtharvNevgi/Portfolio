import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/skill");
        setSkills(res.data || []);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 lg:py-32 bg-linear-to-b from-slate-900 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 mb-8">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-slate-300">Skills</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-200 to-white bg-clip-text text-transparent leading-tight max-w-2xl mx-auto">
            What I bring to the table
          </h2>
        </div>

        {/* Skills Content */}
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-6"></div>
              <p className="text-slate-400 text-lg">Loading skills...</p>
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl mb-4">No skills added yet.</p>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-slate-700/50 inline-block">
                <span className="text-slate-500 text-sm">Skills will appear here</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-700/50 hover:bg-slate-800/60 hover:shadow-2xl hover:-translate-y-2 hover:border-slate-600 transition-all duration-300 text-center cursor-pointer"
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-700/30">
                    {/* Skill icon placeholder - replace with actual icons */}
                    <div className="w-full h-full rounded-xl bg-linear-to-r from-slate-700 to-slate-600 flex items-center justify-center">
                      {/* <span className="text-2xl opacity-75">{skill.icon || '⭐'}</span> */}
                      <img src={skill.icon} alt="Icon" className="rounded-xl"/>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-lg lg:text-xl mb-2 group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </h3>
                  {skill.level && (
                    <p className="text-slate-400 text-sm font-medium bg-slate-700/50 px-3 py-1 rounded-xl group-hover:bg-slate-600/50 transition-all">
                      {skill.level}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}