export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-20 pb-16 bg-linear-to-br from-gray-900 via-slate-900 to-black">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
            
            {/* LEFT CONTENT */}
            <div className="lg:pr-12">
            <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 mb-8">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-2"></span>
                <span className="text-sm font-medium text-slate-300">Available for new opportunities</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight mb-6">
                Hi, I'm <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Atharva Nevgi</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
                Passionate Full-Stack Developer crafting <span className="font-semibold text-white">clean, scalable</span>, and 
                <span className="font-semibold text-white"> user-friendly</span> web applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <a
                href="#projects"
                className="group bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
                >
                View Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                </a>

                <a
                href="/contact"
                className="flex items-center justify-center px-8 py-4 border-2 border-slate-500 text-slate-300 bg-slate-800/50 backdrop-blur-sm rounded-xl font-semibold text-lg hover:bg-slate-700/70 hover:border-slate-400 transition-all duration-300 group gap-2"
                >
                Contact Me
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                </a>
            </div>
            </div>

            {/* RIGHT IMAGE - Simplified */}
            <div className="relative">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-700/50 shadow-2xl">
                <img
                src="/convocation.jpg"
                alt="Atharva Nevgi - Convocation"
                className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
                loading="lazy"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-linear-to-t from-slate-900/90 to-transparent px-6 py-2 rounded-xl border border-slate-700/50 text-white text-sm font-medium">
                Convocation Day ✨
                </div>
            </div>
            </div>
        </div>
    </section>
  );
}