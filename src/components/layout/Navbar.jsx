import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-500"
        >
          IntelliPrep-AI
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="hover:text-cyan-500 transition"
          >
            Home
          </Link>

          <a
            href="#features"
            className="hover:text-cyan-500 transition"
          >
            Features
          </a>

          <a
            href="#faq"
            className="hover:text-cyan-500 transition"
          >
            FAQ
          </a>

          <a
            href="#contact"
            className="hover:text-cyan-500 transition"
          >
            Contact
          </a>

          <Link
            to="/login"
            className="hover:text-cyan-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg transition"
          >
            Get Started
          </Link>

          {/* Dark Mode Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border border-cyan-500 px-3 py-2 rounded-lg hover:bg-cyan-500 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">

          {/* Mobile Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border border-cyan-500 px-3 py-2 rounded-lg"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-500 transition"
          >
            Home
          </Link>

          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-500 transition"
          >
            Features
          </a>

          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-500 transition"
          >
            FAQ
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-500 transition"
          >
            Contact
          </a>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="hover:text-cyan-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg text-center transition"
          >
            Get Started
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;