import { useState } from "react";
import API from "../api/axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await API.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-blue-300 transition-colors mb-6"
        >
          <span className="text-lg">←</span>
          Back to Home
        </a>

        {/* Header card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_18px_60px_rgba(15,23,42,0.8)] px-8 py-10 mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-slate-50 via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-3">
            Contact Me
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl">
            Have a question, project idea, or opportunity? Drop a message and
            you will receive a reply as soon as possible.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_16px_45px_rgba(15,23,42,0.9)] px-8 py-10 space-y-7"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-wide text-slate-200">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-wide text-slate-200">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-wide text-slate-200">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 transition-all duration-200 resize-none"
              placeholder="Write your message here..."
            />
          </div>

          {/* Status Messages */}
          {success && (
            <p className="text-xs font-semibold text-emerald-300">
              ✅ Message sent successfully!
            </p>
          )}

          {error && (
            <p className="text-xs font-semibold text-rose-300">
              ❌ {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-400 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:from-blue-600 hover:to-cyan-500 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}