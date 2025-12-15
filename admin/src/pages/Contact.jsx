/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function Contact() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/contact");
      setMessages(res.data || []);
    } catch (error) {
      console.error("Failed to fetch contact messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

    // Delete skill
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await API.delete(`/contact/${id}`);
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };


  return (
      <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
  <Sidebar />

  <div className="ml-64 p-12 w-full max-w-5xl">
    {/* Header */}
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-12">
      <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
        Contact
      </h1>
      <p className="text-gray-600 font-medium">
        People who have contacted you through your portfolio
      </p>
    </div>

    {/* Messages Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {messages.map((message) => (
        <div
          key={message._id}
          className="group bg-white/80 backdrop-blur-xl hover:bg-white/95 rounded-3xl shadow-xl hover:shadow-2xl border border-white/60 p-6 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-2 hover:border-blue-100 cursor-pointer"
        >
          {/* Top: avatar + name + email */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {message.name?.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                  {message.name}
                </h2>
                {message.email && (
                  <p className="text-xs font-medium text-gray-500 truncate">
                    {message.email}
                  </p>
                )}
              </div>
            </div>

            {message.message && (
              <p className="text-sm text-gray-700 leading-relaxed bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 group-hover:shadow-md transition-all duration-300 line-clamp-4">
                {message.message}
              </p>
            )}
          </div>

          {/* Bottom: actions */}
          <div className="flex items-center justify-between mt-5">
            {message.email && (
              <a
                href={`mailto:${message.email}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                Reply via email
              </a>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(message._id);
              }}
              className="px-4 py-2 text-xs font-semibold bg-linear-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 active:scale-95 focus:ring-4 focus:ring-red-200/50 transform transition-all duration-300 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}