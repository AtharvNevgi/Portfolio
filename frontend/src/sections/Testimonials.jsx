import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await API.get("/testimonials");
        setTestimonials(res.data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-linear-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 mb-8">
            <span className="w-2.5 h-2.5 bg-rose-400 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-slate-300">Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-200 to-white bg-clip-text text-transparent leading-tight max-w-2xl mx-auto">
            What people say about my work
          </h2>
        </div>

        {/* Testimonials Content */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mb-6"></div>
              <p className="text-slate-400 text-lg">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl mb-4">Testimonials will be added soon.</p>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl px-16 py-12 border border-slate-700/50 inline-block">
                <span className="text-slate-500 text-sm">Client reviews will appear here</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="group relative bg-slate-800/30 backdrop-blur-sm rounded-3xl p-10 lg:p-12 border border-slate-700/50 hover:bg-slate-800/60 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden h-full"
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                    ❝
                  </div>

                  {/* linear Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-rose-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="mb-8">
                      <p className="text-slate-300 italic leading-relaxed text-lg lg:text-xl font-light before:content-[''] before:block before:w-12 before:h-0.5 before:bg-linear-to-r before:from-rose-400 before:to-pink-400 before:mx-auto before:mb-6 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-linear-to-r after:from-rose-400 after:to-pink-400 after:mx-auto after:mt-6">
                        "{testimonial.message}"
                      </p>
                    </div>

                    <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-600/50 group-hover:bg-slate-600/50 transition-all duration-300">
                      <h4 className="font-bold text-white text-xl lg:text-2xl mb-1 group-hover:text-rose-400 transition-colors">
                        {testimonial.name}
                      </h4>
                      {testimonial.role && (
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}