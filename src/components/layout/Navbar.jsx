import { Link } from "react-router-dom";
import { Menu, BrainCircuit } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BrainCircuit className="text-cyan-400 w-8 h-8" />
          <span className="text-2xl font-bold text-white">
            IntelliPrep<span className="text-cyan-400">AI</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link to="/" className="hover:text-cyan-400 transition">
            Home
          </Link>

          <a href="#features" className="hover:text-cyan-400 transition">
            Features
          </a>

          <a href="#faq" className="hover:text-cyan-400 transition">
            FAQ
          </a>

          <Link to="/login" className="hover:text-cyan-400 transition">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg text-white font-medium transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden text-white">
          <Menu size={30} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;