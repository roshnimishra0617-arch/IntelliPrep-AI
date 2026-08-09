import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400"
        >
          IntelliPrep-AI
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="hover:text-cyan-400 transition"
          >
            Home
          </Link>

          <a
            href="#features"
            className="hover:text-cyan-400 transition"
          >
            Features
          </a>

          <Link
            to="/login"
            className="hover:text-cyan-400 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400 transition"
          >
            Home
          </Link>

          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400 transition"
          >
            Features
          </a>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-400 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg text-center transition"
          >
            Get Started
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;