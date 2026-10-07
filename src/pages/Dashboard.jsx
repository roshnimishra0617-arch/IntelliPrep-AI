import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

  const [dbUser, setDbUser] = useState(user);
  const [loading, setLoading] = useState(true);
  
  const [aiInterviewScore, setAiInterviewScore] = useState(0);
  const [resumeScore, setResumeScore] = useState(0);
  const [codingScore, setCodingScore] = useState(0);
  const [aptitudeScore, setAptitudeScore] = useState(0);
  const [roadmapScore, setRoadmapScore] = useState(0);
  const [progressScore, setProgressScore] = useState(0);
  const [interviewAttempts, setInterviewAttempts] = useState(0);
  const [codingAttempts, setCodingAttempts] = useState(0);
  const [aptitudeAttempts, setAptitudeAttempts] = useState(0);

useEffect(() => {
  const fetchUser = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${user.id}`
      );

      const data = await response.json();

      if (response.ok) {
        setDbUser(data.user);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Dashboard user error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [user]);

// FETCH AI INTERVIEW SCORE
useEffect(() => {
  const fetchInterviewScore = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${user.id}/interview-score`
      );

      const data = await response.json();

      if (response.ok) {
        setAiInterviewScore(data.score ?? 0);
      }
    } catch (error) {
      console.error("Interview score error:", error);
    }
  };

  fetchInterviewScore();
}, [user]);

// FETCH RESUME ATS SCORE
useEffect(() => {
  const fetchResumeScore = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${user.id}/resume-score`
      );

      const data = await response.json();

      if (response.ok) {
        setResumeScore(data.atsScore);
      }
    } catch (error) {
      console.error("Resume score error:", error);
    }
  };

  fetchResumeScore();
}, [user]);


// FETCH CODING SCORE
useEffect(() => {
  const fetchCodingScore = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${user.id}/coding-score`
      );

      const data = await response.json();

      if (response.ok) {
        setCodingScore(data.score ?? 0);
      }
    } catch (error) {
      console.error("Coding score error:", error);
    }
  };

  fetchCodingScore();
}, [user]);


// FETCH APTITUDE SCORE
useEffect(() => {
  const fetchAptitudeScore = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${user.id}/aptitude-score`
      );

      const data = await response.json();

      if (response.ok) {
        setAptitudeScore(data.score ?? 0);
      }
    } catch (error) {
      console.error("Aptitude score error:", error);
    }
  };

  fetchAptitudeScore();
}, [user]);


// FETCH ROADMAP SCORE
useEffect(() => {
  const fetchRoadmapScore = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${user.id}/roadmap-score`
      );

      const data = await response.json();

      if (response.ok) {
        setRoadmapScore(data.score ?? 0);
      }
    } catch (error) {
      console.error("Roadmap score error:", error);
    }
  };

  fetchRoadmapScore();
}, [user]);

// FETCH OVERALL PROGRESS SCORE
useEffect(() => {
  const fetchProgressScore = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/progress/${user.id}`
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setProgressScore(data.progress?.overallScore ?? 0);

        setInterviewAttempts(
          data.progress?.interviewAttempts ?? 0
        );

        setCodingAttempts(
          data.progress?.codingAttempts ?? 0
        );

        setAptitudeAttempts(
          data.progress?.aptitudeAttempts ?? 0
        );
      }

    } catch (error) {
      console.error("Progress score error:", error);
    }
  };

  fetchProgressScore();
}, [user]);

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
    progress: aiInterviewScore,
    color: "text-cyan-400",
    path: "/ai-interview",
  },

  {
    title: "Resume Analyzer",
    description:
      "Analyze and improve your resume for better ATS performance.",
    icon: <FileText size={30} />,
    progress: resumeScore,
    color: "text-green-400",
    path: "/resume-analyzer",
  },

  {
    title: "Coding Practice",
    description:
      "Solve coding problems and prepare for technical rounds.",
    icon: <Code2 size={30} />,
    progress: codingScore,
    color: "text-yellow-400",
    path: "/coding-practice",
  },

  {
    title: "Aptitude Tests",
    description:
      "Practice quantitative, logical and verbal reasoning with AI-generated questions.",
    icon: <ClipboardCheck size={30} />,
    progress: aptitudeScore,
    color: "text-purple-400",
    path: "/aptitude",
  },

  {
    title: "Learning Roadmap",
    description:
      "Follow a personalized preparation plan for your target role.",
    icon: <Target size={30} />,
    progress: roadmapScore,
    color: "text-pink-400",
    path: "/learning-roadmap",
  },

  {
    title: "Progress Tracker",
    description:
      "Monitor your overall interview preparation journey.",
    icon: <BarChart3 size={30} />,
    progress: progressScore,
    color: "text-blue-400",
    path: "/progress-tracker",
  },
];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">

      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-cyan-500"
          >
            PrepVyera-AI
          </Link>

          {/* Navbar Actions */}
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
            {dbUser?.name || "Student"}!
          </h1>

          {/* User Email */}
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {dbUser?.email}
          </p>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Continue your preparation and get closer to your dream job.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          {/* Overall Progress */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Overall Progress
            </p>

            <h2 className="text-3xl font-bold mt-2 text-cyan-500">
             {progressScore}%
            </h2>
          </div>

          {/* Interviews */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Interviews
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-500">
              {interviewAttempts}
            </h2>
          </div>

          {/* Coding Problems */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Coding Problems
            </p>

            <h2 className="text-3xl font-bold mt-2 text-yellow-500">
              {codingAttempts}
            </h2>
          </div>

          {/* Aptitude Tests */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-800">
            <p className="text-gray-500 dark:text-gray-400">
              Aptitude Tests
            </p>

            <h2 className="text-3xl font-bold mt-2 text-purple-500">
              {aptitudeAttempts}
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
                    {card.progress}%
                  </span>

                </div>

                <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${card.progress}%` }}
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

