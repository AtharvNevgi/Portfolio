import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Failed to fetch blog", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10">Blog not found</p>;
  }

  return (
    <article className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-blue-300 transition-colors"
          >
            <span className="text-lg">←</span>
            Back to Blog
          </Link>

          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase bg-white/5 text-slate-300 border border-white/10">
            Article
          </span>
        </div>

        {/* Main card */}
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_18px_60px_rgba(15,23,42,0.8)] px-6 md:px-10 py-10">
          {/* subtle glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/10 via-transparent to-cyan-400/15" />

          <div className="relative">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-slate-50 via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-4">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] mb-8">
              {blog.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-200 border border-blue-400/40 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                  {blog.category}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/70 text-slate-300 border border-slate-700/60">
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

            {/* Content */}
            <div className="prose prose-invert prose-slate max-w-none text-sm md:text-base leading-relaxed whitespace-pre-line text-slate-100/90">
              {blog.content}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;