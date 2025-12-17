import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/project");
        setProjects(res.data || []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-linear-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 mb-8">
            <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-slate-300">Projects</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-200 to-white bg-clip-text text-transparent leading-tight max-w-2xl mx-auto">
            Featured work that speaks for itself
          </h2>
        </div>

        {/* Projects Content */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mb-6"></div>
              <p className="text-slate-400 text-lg">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl mb-4">No projects added yet.</p>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl px-16 py-12 border border-slate-700/50 inline-block">
                <span className="text-slate-500 text-sm">Projects will showcase here</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="group relative bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-700/50 hover:bg-slate-800/60 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden"
                >
                  {/* linear Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Project Image Placeholder */}
                  <div className="w-full h-48 lg:h-52 bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl mb-6 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full bg-linear-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                      <span className="text-3xl opacity-30">{project.title?.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    {project.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-slate-700/50 backdrop-blur-sm text-slate-300 px-4 py-2 rounded-xl text-sm font-medium border border-slate-600/50 hover:bg-slate-600/50 hover:border-slate-500/50 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="group/btn flex items-center justify-center gap-2 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70 text-slate-300 px-6 py-3 rounded-xl border border-slate-600/50 font-semibold text-sm hover:shadow-lg hover:scale-[1.02] hover:border-slate-500/50 transition-all duration-300 flex-1"
                        >
                          <svg className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.177.768.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="group/btn flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}