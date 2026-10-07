import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Invalid email or password");
      return;
    }

    login({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      mobile: data.user.mobile,
    });

    alert("Login successful!");

    navigate("/dashboard");
  } catch (error) {
    console.error("Login Error:", error);
    alert("Unable to connect to the backend.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">

        <h1 className="text-4xl font-bold text-white text-center">
          Welcome
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Login to continue your interview preparation.
        </p>

        {/* Email */}
        <div className="mt-8 relative">
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

        {/* Remember Me */}
        <div className="flex justify-between items-center mt-5 text-sm">

          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" />
            Remember Me
          </label>

          <button
            type="button"
            className="text-cyan-400 hover:underline"
          >
            Forgot Password?
          </button>

        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;