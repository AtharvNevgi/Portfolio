import { useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.put("/change-password", {
        currentPassword,
        newPassword
      });

      setMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <Sidebar />
<div className="ml-64 p-12 w-full max-w-2xl">
  <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">
    <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-8">
      Change Password
    </h1>
    <p className="text-gray-600 font-medium mb-12">Update your account password securely</p>

    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-800 tracking-wide">
          Current Password
        </label>
        <input
          type="password"
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300 required"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-800 tracking-wide">
          New Password
        </label>
        <input
          type="password"
          placeholder="Create a strong new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300 required"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl border border-transparent hover:from-blue-700 hover:to-indigo-700 active:scale-95 focus:ring-4 focus:ring-blue-200/50 transform transition-all duration-300 hover:scale-1.02 overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? "Updating..." : "Change Password"}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 fill-none stroke-currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl text-sm ${message.includes('success') || message.includes('updated') ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
          {message}
        </div>
      )}
    </form>
  </div>
</div>
    </>
  );
}