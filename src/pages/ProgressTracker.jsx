import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  BrainCircuit,
  FileText,
  Code2,
  ClipboardCheck,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  RefreshCw,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ProgressTracker() {
  const { darkMode } = useTheme();

  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD PROGRESS
  // ==========================================

  const loadProgress = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/progress"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load progress."
        );
      }

      setProgress(data.progress);
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to load progress. Please check whether the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // AI ANALYSIS
  // ==========================================

  const generateAIAnalysis = async () => {
    if (!progress) return;

    setGenerating(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/analyze-progress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(progress),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "AI analysis could not be generated."
        );
      }

      setProgress((previous) => ({
        ...previous,
        aiAnalysis: data.analysis,
      }));
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to generate AI progress analysis."
      );
    } finally {
      setGenerating(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadProgress();
  }, []);

  // ==========================================
  // MODULE DATA
  // ==========================================

  const modules = [
    {
      title: "AI Interview",
      icon: BrainCircuit,
      score: progress?.modules?.interview?.score ?? 0,
      completed:
        progress?.modules?.interview?.completed ?? 0,
      description: "Interview preparation",
    },
    {
      title: "Resume Analyzer",
      icon: FileText,
      score: progress?.modules?.resume?.score ?? 0,
      completed:
        progress?.modules?.resume?.completed ?? 0,
      description: "Resume & ATS readiness",
    },
    {
      title: "Coding Practice",
      icon: Code2,
      score: progress?.modules?.coding?.score ?? 0,
      completed:
        progress?.modules?.coding?.completed ?? 0,
      description: "Programming skills",
    },
    {
      title: "AI Aptitude",
      icon: ClipboardCheck,
      score: progress?.modules?.aptitude?.score ?? 0,
      completed:
        progress?.modules?.aptitude?.completed ?? 0,
      description: "Aptitude preparation",
    },
    {
      title: "Learning Roadmap",
      icon: BookOpen,
      score: progress?.modules?.roadmap?.score ?? 0,
      completed:
        progress?.modules?.roadmap?.completed ?? 0,
      description: "Learning progress",
    },
  ];

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center">
          <Loader2
            className="w-10 h-10 animate-spin mx-auto mb-4 text-purple-600"
          />

          <p
            className={
              darkMode
                ? "text-slate-300"
                : "text-gray-600"
            }
          >
            Loading your preparation progress...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div className="flex items-center gap-4">

            <Link
              to="/dashboard"
              className={`p-3 rounded-xl transition ${
                darkMode
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-white border border-gray-200 hover:bg-gray-100 shadow-sm"
              }`}
            >
              <ArrowLeft size={20} />
            </Link>

            <div>

              <div className="flex items-center gap-2">

                <BarChart3
                  className="text-purple-600"
                />

                <h1 className="text-3xl font-bold">
                  Progress Tracker
                </h1>

              </div>

              <p
                className={`mt-1 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-600"
                }`}
              >
                Track your complete AI-powered career
                preparation journey.
              </p>

            </div>
          </div>

          <button
            onClick={loadProgress}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-white border border-gray-200 hover:bg-gray-100 shadow-sm"
            }`}
          >
            <RefreshCw size={18} />

            Refresh
          </button>

        </div>

        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div
            className={`mb-6 p-4 rounded-xl border ${
              darkMode
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-red-200 bg-red-50 text-red-600"
            }`}
          >
            {error}
          </div>
        )}

        {/* ==========================================
            OVERALL PROGRESS
        ========================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Overall Card */}

          <div
            className={`lg:col-span-2 rounded-2xl p-6 border transition ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >

            <div className="flex items-center justify-between mb-6">

              <div>

                <p
                  className={
                    darkMode
                      ? "text-slate-400"
                      : "text-gray-500"
                  }
                >
                  Overall Preparation
                </p>

                <h2 className="text-5xl font-bold mt-2">
                  {progress?.overallScore ?? 0}%
                </h2>

              </div>

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  darkMode
                    ? "bg-purple-500/10"
                    : "bg-purple-50"
                }`}
              >
                <Target
                  className="text-purple-600 w-8 h-8"
                />
              </div>

            </div>

            <div
              className={`w-full h-4 rounded-full overflow-hidden ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-gray-200"
              }`}
            >
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(
                    progress?.overallScore ?? 0,
                    100
                  )}%`,
                }}
              />
            </div>

            <div
              className={`flex justify-between text-sm mt-2 ${
                darkMode
                  ? "text-slate-400"
                  : "text-gray-500"
              }`}
            >
              <span>Starting Point</span>
              <span>Career Ready</span>
            </div>

          </div>

          {/* ==========================================
              QUICK STATS
          ========================================== */}

          <div className="grid grid-cols-2 gap-4">

            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <TrendingUp
                className="text-green-500 mb-3"
              />

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
              >
                Improvement
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {progress?.improvement ?? 0}%
              </h3>
            </div>

            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <Award
                className="text-yellow-500 mb-3"
              />

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
              >
                Milestones
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {progress?.milestonesCompleted ?? 0}
              </h3>
            </div>

            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <ClipboardCheck
                className="text-blue-500 mb-3"
              />

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
              >
                Tests Completed
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {progress?.testsCompleted ?? 0}
              </h3>
            </div>

            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <Code2
                className="text-orange-500 mb-3"
              />

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
              >
                Tasks Completed
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {progress?.tasksCompleted ?? 0}
              </h3>
            </div>

          </div>
        </div>

        {/* ==========================================
            MODULE PERFORMANCE
        ========================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-2 mb-5">

            <BarChart3
              className="text-purple-600"
            />

            <h2 className="text-2xl font-bold">
              Module Performance
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {modules.map((module) => {

              const Icon = module.icon;

              return (
                <div
                  key={module.title}
                  className={`rounded-2xl p-5 border transition hover:-translate-y-1 ${
                    darkMode
                      ? "bg-slate-900 border-slate-800 hover:border-purple-500/40"
                      : "bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200"
                  }`}
                >

                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-3">

                      <div
                        className={`p-3 rounded-xl ${
                          darkMode
                            ? "bg-purple-500/10"
                            : "bg-purple-50"
                        }`}
                      >
                        <Icon
                          className="text-purple-600"
                        />
                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {module.title}
                        </h3>

                        <p
                          className={`text-xs ${
                            darkMode
                              ? "text-slate-500"
                              : "text-gray-500"
                          }`}
                        >
                          {module.description}
                        </p>

                      </div>

                    </div>

                    <span className="text-lg font-bold">
                      {module.score}%
                    </span>

                  </div>

                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${
                      darkMode
                        ? "bg-slate-800"
                        : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          module.score,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <div
                    className={`flex justify-between mt-3 text-sm ${
                      darkMode
                        ? "text-slate-400"
                        : "text-gray-500"
                    }`}
                  >
                    <span>
                      {module.completed} completed
                    </span>

                    <span>
                      {module.score >= 80
                        ? "Strong"
                        : module.score >= 50
                        ? "Improving"
                        : "Needs Practice"}
                    </span>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* ==========================================
            AI ANALYSIS
        ========================================== */}

        <div
          className={`rounded-2xl p-6 mb-8 border ${
            darkMode
              ? "bg-slate-900 border-purple-500/20"
              : "bg-white border-purple-100 shadow-sm"
          }`}
        >

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div className="flex items-center gap-3">

              <div
                className={`p-3 rounded-xl ${
                  darkMode
                    ? "bg-purple-500/10"
                    : "bg-purple-50"
                }`}
              >
                <Sparkles
                  className="text-purple-600"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  AI Progress Analysis
                </h2>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-gray-500"
                  }`}
                >
                  Get personalized recommendations based
                  on your performance.
                </p>

              </div>

            </div>

            <button
              onClick={generateAIAnalysis}
              disabled={generating}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 transition"
            >
              {generating ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Analyze with AI
                </>
              )}
            </button>

          </div>

          {progress?.aiAnalysis ? (
            <div className="space-y-6">

              {/* Summary */}

              <div>

                <h3 className="font-semibold text-purple-600 mb-2">
                  Summary
                </h3>

                <p
                  className={`leading-relaxed ${
                    darkMode
                      ? "text-slate-300"
                      : "text-gray-700"
                  }`}
                >
                  {progress.aiAnalysis.summary}
                </p>

              </div>

              {/* Strengths */}

              {progress.aiAnalysis.strengths?.length > 0 && (
                <div>

                  <h3 className="font-semibold text-green-600 mb-2">
                    Your Strengths
                  </h3>

                  <ul className="space-y-2">

                    {progress.aiAnalysis.strengths.map(
                      (item, index) => (
                        <li
                          key={index}
                          className={
                            darkMode
                              ? "text-slate-300"
                              : "text-gray-700"
                          }
                        >
                          ✓ {item}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* Weak Areas */}

              {progress.aiAnalysis.weakAreas?.length > 0 && (
                <div>

                  <h3 className="font-semibold text-orange-600 mb-2">
                    Areas to Improve
                  </h3>

                  <ul className="space-y-2">

                    {progress.aiAnalysis.weakAreas.map(
                      (item, index) => (
                        <li
                          key={index}
                          className={
                            darkMode
                              ? "text-slate-300"
                              : "text-gray-700"
                          }
                        >
                          • {item}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* Recommendations */}

              {progress.aiAnalysis.recommendations?.length > 0 && (
                <div>

                  <h3 className="font-semibold text-blue-600 mb-2">
                    AI Recommendations
                  </h3>

                  <ul className="space-y-2">

                    {progress.aiAnalysis.recommendations.map(
                      (item, index) => (
                        <li
                          key={index}
                          className={
                            darkMode
                              ? "text-slate-300"
                              : "text-gray-700"
                          }
                        >
                          → {item}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* Next Step */}

              {progress.aiAnalysis.nextStep && (
                <div
                  className={`p-4 rounded-xl border ${
                    darkMode
                      ? "bg-purple-500/10 border-purple-500/20"
                      : "bg-purple-50 border-purple-100"
                  }`}
                >

                  <h3 className="font-semibold text-purple-600 mb-1">
                    Recommended Next Step
                  </h3>

                  <p
                    className={
                      darkMode
                        ? "text-slate-300"
                        : "text-gray-700"
                    }
                  >
                    {progress.aiAnalysis.nextStep}
                  </p>

                </div>
              )}

            </div>
          ) : (
            <div
              className={`text-center py-10 ${
                darkMode
                  ? "text-slate-400"
                  : "text-gray-500"
              }`}
            >

              <Sparkles className="w-10 h-10 mx-auto mb-3 text-purple-600" />

              <p>
                Click{" "}
                <strong>Analyze with AI</strong>{" "}
                to receive personalized preparation
                recommendations.
              </p>

            </div>
          )}

        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div
          className={`text-center text-sm pb-6 ${
            darkMode
              ? "text-slate-500"
              : "text-gray-500"
          }`}
        >
          PrepVyera AI • Your personalized career
          preparation companion 🚀
        </div>

      </div>
    </div>
  );
}

export default ProgressTracker;