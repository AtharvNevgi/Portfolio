export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 lg:py-24 bg-linear-to-b from-slate-900 via-slate-950 to-slate-950 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-700/50">
              <h3 className="font-bold text-white text-xl lg:text-2xl mb-1 group-hover:text-rose-400 transition-colors">
                Atharva Nevgi
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                Full-Stack Developer crafting modern, scalable web applications with clean code.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6 bg-linear-to-r from-slate-300 to-white bg-clip-text">
                  Quick Links
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#home" className="group flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-2xl backdrop-blur-sm border border-slate-700/30 transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-2">
                      <span className="w-2 h-2 bg-linear-to-r from-blue-400 to-purple-400 rounded-full group-hover:scale-110 transition-transform"></span>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="group flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-2xl backdrop-blur-sm border border-slate-700/30 transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-2">
                      <span className="w-2 h-2 bg-linear-to-r from-emerald-400 to-teal-400 rounded-full group-hover:scale-110 transition-transform"></span>
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className="group flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-2xl backdrop-blur-sm border border-slate-700/30 transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-2">
                      <span className="w-2 h-2 bg-linear-to-r from-indigo-400 to-purple-400 rounded-full group-hover:scale-110 transition-transform"></span>
                      Projects
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-white mb-6 bg-linear-to-r from-slate-300 to-white bg-clip-text">
                  Get In Touch
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#skills" className="group flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-2xl backdrop-blur-sm border border-slate-700/30 transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-2">
                      <span className="w-2 h-2 bg-linear-to-r from-teal-400 to-emerald-400 rounded-full group-hover:scale-110 transition-transform"></span>
                      Skills
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="group flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-2xl backdrop-blur-sm border border-slate-700/30 transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-2">
                      <span className="w-2 h-2 bg-linear-to-r from-rose-400 to-pink-400 rounded-full group-hover:scale-110 transition-transform"></span>
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="group flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-2xl backdrop-blur-sm border border-slate-700/30 transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-2">
                      <span className="w-2 h-2 bg-linear-to-r from-orange-400 to-red-400 rounded-full group-hover:scale-110 transition-transform"></span>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright & Social */}
          <div className="lg:text-right">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-700/50 h-full">
              <div className="flex items-center justify-between mb-6">
                <p className="font-bold text-white text-xl lg:text-2xl mb-1 group-hover:text-rose-400 transition-colors">
                © {year} Atharva Nevgi
                </p>
              </div>
              <div className="w-full h-px bg-linear-to-r from-slate-700 via-white to-slate-700/50 mb-6"></div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Built with ❤️ using React.js & Tailwind CSS
              </p>
                <div className="flex items-center gap-3">
                  {/* GitHub */}
                  <a
                    href="https://github.com/AtharvNevgi"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 hover:border-blue-400/60 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.43c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.28 1.87 1.28 1.08 1.86 2.84 1.32 3.53 1.01.11-.79.42-1.32.76-1.63-2.67-.31-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.54.12-3.2 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.9.12 3.2.77.84 1.24 1.91 1.24 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/atharvanevgi/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 hover:border-cyan-400/60 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.28 8.11h4.44V24H.28V8.11zM8.34 8.11h4.25v2.16h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.29 2.94 5.29 6.76V24h-4.44v-8.01c0-1.91-.03-4.37-2.66-4.37-2.67 0-3.08 2.08-3.08 4.23V24H8.34V8.11z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
}