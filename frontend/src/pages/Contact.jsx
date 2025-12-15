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
    <section className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <a
            href="/"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition mb-4"
        >
            ← Back to Home
        </a>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Contact Me
        </h1>

        <p className="text-gray-600 mb-10">
          Have a question, project idea, or opportunity?
          Feel free to reach out using the form below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Status Messages */}
          {success && (
            <p className="text-green-600 font-medium">
              ✅ Message sent successfully!
            </p>
          )}

          {error && (
            <p className="text-red-600 font-medium">
              ❌ {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}