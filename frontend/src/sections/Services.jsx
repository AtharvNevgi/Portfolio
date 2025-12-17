import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services");
        setServices(res.data || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 lg:py-32 bg-linear-to-b from-slate-900 via-slate-950 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 mb-8">
            <span className="w-2.5 h-2.5 bg-teal-400 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-slate-300">Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-200 to-white bg-clip-text text-transparent leading-tight max-w-2xl mx-auto">
            What I can help you build
          </h2>
        </div>

        {/* Services Content */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mb-6"></div>
              <p className="text-slate-400 text-lg">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl mb-4">No services added yet.</p>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl px-16 py-12 border border-slate-700/50 inline-block">
                <span className="text-slate-500 text-sm">Services will showcase here</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="group relative bg-slate-800/30 backdrop-blur-sm rounded-3xl p-10 lg:p-12 border border-slate-700/50 hover:bg-slate-800/60 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden h-full"
                >
                  {/* Service Icon Circle */}
                  {/* <div className="w-24 h-24 lg:w-28 lg:h-28 bg-linear-to-br from-teal-500/20 via-blue-500/20 to-emerald-500/20 rounded-3xl mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-slate-700/30">
                    <div className="w-full h-full rounded-2xl bg-linear-to-r from-slate-700 to-slate-600 flex items-center justify-center p-6">
                      <span className="text-3xl lg:text-4xl opacity-75">{service.icon || '✨'}</span>
                    </div>
                  </div> */}

                  {/* linear Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-white to-slate-200 bg-clip-text text-transparent mb-6 group-hover:from-teal-400 group-hover:to-emerald-400 transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-300 leading-relaxed text-lg lg:text-xl">
                      {service.description}
                    </p>
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