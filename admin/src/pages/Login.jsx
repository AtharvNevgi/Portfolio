import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Login() {
  const  {login}  = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", { username, password });
      login(res.data.token);
      // console.log(username, password)
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
      console.log(error);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="w-full max-w-md px-4">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl px-8 py-10 text-slate-100"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/10 via-cyan-400/5 to-purple-500/10 pointer-events-none" />

            <div className="relative">
              <h1 className="text-3xl font-extrabold text-center mb-2 tracking-tight">
                Admin Login
              </h1>
              <p className="text-sm text-slate-300 text-center mb-8">
                Enter your credentials to access the dashboard
              </p>

              {/* Username */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-semibold tracking-wide text-slate-200">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/20 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-2 mb-7">
                <label className="text-xs font-semibold tracking-wide text-slate-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/20 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-400 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:from-blue-600 hover:to-cyan-500 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}