import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BrainCircuit,
  FileText,
  Code2,
  ClipboardCheck,
  Target,
  BarChart3,
  LogOut,
  Home,
} from "lucide-react";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const preparationCards = [
    {
      title: "AI Interview",
      description:
        "Practice HR and technical interviews with AI-powered feedback.",
      icon: <BrainCircuit size={30} />,
      progress: "65%",
      color: "text-cyan-400",
      path: "/ai-interview",
    },
    {
      title: "Resume Analyzer",
      description:
        "Analyze and improve your resume for better ATS performance.",
      icon: <FileText size={30} />,
      progress: "80%",
      color: "text-green-400",
      path: "/resume-analyzer",
    },
    {
      title: "Coding Practice",
      description:
        "Solve coding problems and prepare for technical rounds.",
      icon: <Code2 size={30} />,
      progress: "55%",
      color: "text-yellow-400",
      path: "#",
    },
    {
      title: "Aptitude Tests",
      description:
        "Practice quantitative, logical and verbal reasoning.",
      icon: <ClipboardCheck size={30} />,
      progress: "70%",
      color: "text-purple-400",
      path: "#",
    },
    {
      title: "Learning Roadmap",
      description:
        "Follow a personalized preparation plan for your target role.",
      icon: <Target size={30} />,
      progress: "45%",
      color: "text-pink-400",
      path: "#",
    },
    {
      title: "Progress Tracker",
      description:
        "Monitor your overall interview preparation journey.",
      icon: <BarChart3 size={30} />,
      progress: "68%",
      color: "text-blue-400",
      path: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-bold text-cyan-500"
          >
            IntelliPrep-AI
          </Link>

          <div className="flex items-center gap-4">

            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              <Home size={18} />
              Home
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome Section */}
        <div className="mb-10">

          <p className="text-cyan-500 font-medium mb-2">
            Welcome back 👋
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            {user?.name || "Student"}!
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Continue your preparation and get closer to your dream job.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Overall Progress
            </p>

            <h2 className="text-3xl font-bold mt-2 text-cyan-500">
              68%
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Interviews
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-500">
              12
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Coding Problems
            </p>

            <h2 className="text-3xl font-bold mt-2 text-yellow-500">
              48
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Aptitude Tests
            </p>

            <h2 className="text-3xl font-bold mt-2 text-purple-500">
              18
            </h2>
          </div>

        </div>

        {/* Preparation Section */}
        <div className="mb-6">

          <h2 className="text-3xl font-bold">
            Your Preparation
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Choose an area and continue your preparation.
          </p>

        </div>

        {/* Preparation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {preparationCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >

              {/* Icon */}
              <div className={`${card.color} mb-5`}>
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mt-3 leading-6">
                {card.description}
              </p>

              {/* Progress */}
              <div className="mt-6">

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-500 dark:text-gray-400">
                    Progress
                  </span>

                  <span className="font-semibold">
                    {card.progress}
                  </span>

                </div>

                <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: card.progress }}
                  />

                </div>

              </div>

              {/* Continue Button */}
              <Link
                to={card.path}
                className="block w-full mt-6 text-center border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white py-2.5 rounded-lg font-medium transition"
              >
                Continue
              </Link>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
}

export default Dashboard;