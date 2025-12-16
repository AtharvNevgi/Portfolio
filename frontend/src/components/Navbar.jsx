import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", path: "/blogs" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
  {/* Glass bar */}
  <div className="backdrop-blur-2xl bg-slate-950/70 border-b border-slate-800/70 shadow-[0_10px_40px_rgba(15,23,42,0.9)]">
    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="inline-flex items-center gap-2"
      >
        <span className="text-xl md:text-2xl font-extrabold bg-linear-to-r from-slate-50 via-blue-100 to-cyan-200 bg-clip-text text-transparent tracking-tight">
          MyPortfolio
        </span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) =>
          link.href ? (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative text-slate-300 hover:text-cyan-200 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-linear-to-r from-blue-400 to-cyan-400 after:rounded-full hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            </li>
          ) : (
            <li key={link.name}>
              <Link
                to={link.path}
                className="relative text-slate-300 hover:text-cyan-200 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-linear-to-r from-blue-400 to-cyan-400 after:rounded-full hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-slate-100 text-2xl p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden backdrop-blur-2xl bg-slate-950/90 border-b border-slate-800/80">
      <ul className="flex flex-col px-6 py-4 gap-3 text-sm font-medium">
        {navLinks.map((link) =>
          link.href ? (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-slate-200 hover:text-cyan-200 hover:bg-white/5 rounded-xl px-3 transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ) : (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-slate-200 hover:text-cyan-200 hover:bg-white/5 rounded-xl px-3 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  )}
</nav>
  );
}