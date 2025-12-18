import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-blue-300 transition-colors"
          >
            <span className="text-lg">←</span>
            Back to Home
          </Link>

          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase bg-white/5 text-slate-300 border border-white/10">
            Blog
          </span>
        </div>

        {/* Header */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_18px_60px_rgba(15,23,42,0.7)] p-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-slate-50 via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-3">
            Insights & Articles
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl">
            Explore thoughts, tutorials, and stories around development,
            design, and everything in between.
          </p>
        </div>

        {/* Empty / loading states */}
        {loading && (
          <p className="text-center text-slate-300 text-sm">Loading blogs...</p>
        )}

        {!loading && blogs.length === 0 && (
          <div className="bg-white/5 backdrop-blur-2xl border border-dashed border-slate-600/60 rounded-3xl p-10 text-center">
            <p className="text-slate-300 text-sm font-medium">
              No blogs published yet.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Once you add blogs from the admin panel, they will appear here.
            </p>
          </div>
        )}

        {/* Blogs grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-[0_16px_45px_rgba(15,23,42,0.8)] hover:shadow-[0_22px_70px_rgba(15,23,42,0.95)] transition-all duration-300 hover:-translate-y-2"
              >
                {/* subtle linear overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/5 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <Link to={`/blogs/${blog.slug}`}>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-50 mb-2 group-hover:text-cyan-200 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] mb-4">
                    {blog.category && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-200 border border-blue-400/40 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                        {blog.category}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/60 text-slate-300 border border-slate-700/60">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm md:text-[15px] text-slate-200/90 leading-relaxed line-clamp-4">
                    {blog.content}
                  </p>
                </div>

                <div className="relative flex items-center justify-between mt-6">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-200 hover:text-white transition-colors"
                  >
                    Read more
                    <span className="text-lg group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>

                  <div className="h-8 w-8 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-slate-950 shadow-lg shadow-blue-500/50">
                    {blog.title?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;