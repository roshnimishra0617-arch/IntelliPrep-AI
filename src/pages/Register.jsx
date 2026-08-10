import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // For now, registration is handled on the frontend.
    // The actual backend/database can be connected later.
    localStorage.setItem(
      "intelliprep_registered_user",
      JSON.stringify({
        name,
        email,
        password,
      })
    );

    alert("Registration successful! Please login.");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Start your interview preparation journey.
        </p>

        {/* Name */}
        <div className="mt-8 relative">
          <User
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-cyan-400"
          />
        </div>

        {/* Email */}
        <div className="mt-5 relative">
          <Mail
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-cyan-400"
          />
        </div>

        {/* Password */}
        <div className="mt-5 relative">
          <Lock
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-cyan-400"
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Create Account
        </button>

        {/* Login */}
        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;