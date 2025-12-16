import { NavLink } from "react-router-dom";
import {useContext} from 'react';
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skill", path: "/skills"},
    { name: "Experience", path: "/experience" },
    { name: "Services", path: "/services" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Change Password", path: "/change-password" }
  ];

  const {logout} = useContext(AuthContext);

  const logoutUser = () => {
    alert("Are you Sure ?");
    console.log("loggedout")
    logout()
  }

  return (
      <div className="w-64 h-screen fixed left-0 top-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 border-r border-slate-800/70 shadow-2xl">
        <div className="h-full flex flex-col px-5 py-6">
          {/* Logo / Title */}
          <div className="mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight flex items-center justify-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-slate-800/80 shadow-inner text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                Admin
              </span>
              <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Panel
              </span>
            </h2>
          </div>

          {/* Menu */}
          <ul className="space-y-1 flex-1">
            {menu.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                      "hover:bg-slate-800/80 hover:text-white hover:translate-x-1",
                      "border border-transparent hover:border-slate-700/60",
                      isActive
                        ? "bg-slate-800/90 text-white border-slate-700 shadow-lg shadow-slate-900/40"
                        : "text-slate-300"
                    ].join(" ")
                  }
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-blue-400 to-cyan-300" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <button
            onClick={logoutUser}
            className="mt-6 w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-linear-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-rose-900/40 hover:shadow-xl hover:from-red-600 hover:to-rose-700 active:scale-95 transition-all duration-200 cursor-pointer border border-red-500/60"
          >
            Logout
          </button>
        </div>
      </div>
  );
}