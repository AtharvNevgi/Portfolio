export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 lg:py-24 bg-linear-to-b from-slate-900 via-gray-900 to-black/95 border-t border-slate-800/50">
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
                    <a href="#contact" className="group flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 px-4 py-3 rounded-2xl backdrop-blur-sm border border-slate-700/30 transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-2">
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}