import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show / Hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Check all fields
    if (
      !name.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Gmail validation
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailPattern.test(email.trim())) {
      alert("Please enter a valid Gmail address");
      return;
    }

    // Mobile number validation
    const mobilePattern = /^[6-9]\d{9}$/;

    if (!mobilePattern.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // For now, registration is handled on the frontend.
    // The actual backend/database can be connected later.
    localStorage.setItem(
      "prepvyera_registered_user",
      JSON.stringify({
        name,
        email,
        mobile,
        password,
      })
    );

    alert("Registration successful! Please login.");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 flex items-center justify-center px-6 py-8">

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
            placeholder="Gmail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-cyan-400"
          />
        </div>

        {/* Mobile Number */}
        <div className="mt-5 relative">
          <Phone
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setMobile(value);
            }}
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-cyan-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-cyan-400 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mt-5 relative">
          <Lock
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-cyan-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-3.5 text-gray-400 hover:text-cyan-400 transition"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
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