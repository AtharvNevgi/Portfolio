import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-blue-50">
      <Sidebar />

      <div className="ml-64 w-full p-10">
        <div className="max-w-6xl mx-auto">
          {/* Top welcome card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-10 mb-8">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3">
              Dashboard
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-slate-900 via-slate-800 to-blue-700 bg-clip-text text-transparent mb-4">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl">
              Manage your portfolio content, projects, skills, services, and more from a single, beautifully designed control center.
            </p>
          </div>

          {/* Quick stats / shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-6">
              <p className="text-xs font-semibold text-slate-500 tracking-wide mb-2">
                Content
              </p>
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Profile & About
              </h2>
              <p className="text-xs text-slate-500">
                Update your personal details and about section.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-6">
              <p className="text-xs font-semibold text-slate-500 tracking-wide mb-2">
                Work
              </p>
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Projects & Services
              </h2>
              <p className="text-xs text-slate-500">
                Showcase your work, services, and offerings.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-6">
              <p className="text-xs font-semibold text-slate-500 tracking-wide mb-2">
                Social Proof
              </p>
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Skills & Testimonials
              </h2>
              <p className="text-xs text-slate-500">
                Highlight your strengths and client feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}