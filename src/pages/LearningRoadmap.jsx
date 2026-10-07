import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Map,
  Sparkles,
  Briefcase,
  Code2,
  Clock,
  Loader2,
  Target,
  BookOpen,
  CheckCircle,
  FolderGit2,
  MessageSquare,
  RefreshCw,
  Lightbulb,
} from "lucide-react";

function LearningRoadmap() {
  const { user } = useAuth();

  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [duration, setDuration] = useState("8 Weeks");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [completedWeeks, setCompletedWeeks] = useState([]);

  // =====================================================
  // GENERATE AI ROADMAP
  // =====================================================

  const handleGenerateRoadmap = async () => {
    setError("");

    if (!targetRole.trim()) {
      setError("Please enter your target job role.");
      return;
    }

    if (!skills.trim()) {
      setError("Please enter your current skills.");
      return;
    }

    setLoading(true);
    setRoadmapData(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-roadmap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetRole: targetRole.trim(),
            skills: skills.trim(),
            experience,
            duration,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to generate AI learning roadmap."
        );
      }

      if (!data.roadmap) {
        throw new Error(
          "AI returned an empty roadmap."
        );
      }

      setRoadmapData(data.roadmap);

      // Scroll to generated roadmap
      setTimeout(() => {
        document
          .getElementById("generated-roadmap")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);
    } catch (error) {
      console.error(
        "Learning Roadmap Error:",
        error
      );

      setError(
        error.message ||
          "Unable to generate roadmap. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SAVE ROADMAP PROGRESS
  // =====================================================

  const handleWeekCompletion = async (weekIndex) => {
    if (!user?.id || !roadmapData?.roadmap) {
      return;
    }

    const totalTasks = roadmapData.roadmap.length;

    let updatedCompletedWeeks;

    if (completedWeeks.includes(weekIndex)) {
      updatedCompletedWeeks = completedWeeks.filter(
        (index) => index !== weekIndex
      );
    } else {
      updatedCompletedWeeks = [
        ...completedWeeks,
        weekIndex,
      ];
    }

    setCompletedWeeks(updatedCompletedWeeks);

    const completedTasks =
      updatedCompletedWeeks.length;

    const progress =
      totalTasks > 0
        ? Math.round(
            (completedTasks / totalTasks) * 100
          )
        : 0;

    try {
      const response = await fetch(
        "http://localhost:5000/api/save-roadmap-progress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            completedTasks,
            totalTasks,
            progress,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save roadmap progress."
        );
      }

      console.log(
        "Roadmap progress saved successfully:",
        progress
      );
    } catch (error) {
      console.error(
        "Roadmap Progress Error:",
        error
      );
    }
  };

  // =====================================================
  // RESET ROADMAP
  // =====================================================

  const handleCreateNewRoadmap = () => {
    setRoadmapData(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">

        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <Link
            to="/dashboard"
            className="text-2xl font-bold text-cyan-500"
          >
            PrepVyera-AI
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition"
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>

        </div>

      </nav>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center mb-10">

          <div className="flex justify-center mb-5">

            <div className="p-5 rounded-2xl bg-pink-500/10 text-pink-500">
              <Map size={48} />
            </div>

          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            AI Learning Roadmap
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Get a personalized learning roadmap generated
            by AI according to your target role, current
            skills and preparation timeline.
          </p>

        </div>

        {/* =================================================
            INPUT FORM
        ================================================= */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 p-8">

          {/* Target Role */}

          <div className="mb-7">

            <label className="flex items-center gap-2 font-semibold mb-3">

              <Briefcase
                size={19}
                className="text-cyan-500"
              />

              Target Job Role

            </label>

            <input
              type="text"
              value={targetRole}
              onChange={(e) =>
                setTargetRole(e.target.value)
              }
              placeholder="e.g. Full Stack Developer"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-cyan-500 transition"
            />

          </div>

          {/* Current Skills */}

          <div className="mb-7">

            <label className="flex items-center gap-2 font-semibold mb-3">

              <Code2
                size={19}
                className="text-cyan-500"
              />

              Current Skills

            </label>

            <textarea
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="e.g. HTML, CSS, JavaScript, React, Python"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-cyan-500 resize-none transition"
            />

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Separate multiple skills using commas.
            </p>

          </div>

          {/* Experience */}

          <div className="mb-7">

            <label className="block font-semibold mb-3">
              Experience Level
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              {[
                "Beginner",
                "Intermediate",
                "Advanced",
              ].map((level) => (

                <button
                  key={level}
                  type="button"
                  onClick={() =>
                    setExperience(level)
                  }
                  className={`py-3 rounded-xl border font-semibold transition ${
                    experience === level
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "border-gray-300 dark:border-slate-700 hover:border-cyan-500"
                  }`}
                >
                  {level}
                </button>

              ))}

            </div>

          </div>

          {/* Duration */}

          <div className="mb-8">

            <label className="flex items-center gap-2 font-semibold mb-3">

              <Clock
                size={19}
                className="text-cyan-500"
              />

              Preparation Duration

            </label>

            <select
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-cyan-500 transition"
            >
              <option>4 Weeks</option>
              <option>8 Weeks</option>
              <option>12 Weeks</option>
              <option>16 Weeks</option>
              <option>24 Weeks</option>
            </select>

          </div>

          {/* Error */}

          {error && (

            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400">

              <div className="flex items-start gap-3">

                <span className="font-semibold">
                  Error:
                </span>

                <span>{error}</span>

              </div>

            </div>

          )}

          {/* Generate Button */}

          <button
            onClick={handleGenerateRoadmap}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition"
          >

            {loading ? (

              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />

                AI is preparing your roadmap...
              </>

            ) : (

              <>
                <Sparkles size={20} />

                Generate AI Roadmap
              </>

            )}

          </button>

          <div className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">

            Your roadmap will be generated dynamically
            by Gemini AI according to your profile.

          </div>

        </div>

        {/* =================================================
            GENERATED ROADMAP
        ================================================= */}

        {roadmapData && (

          <div
            id="generated-roadmap"
            className="mt-12 space-y-8"
          >

            {/* =================================================
                ROADMAP SUMMARY
            ================================================= */}

            <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-3xl border border-cyan-500/20 p-8">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <div className="flex items-center gap-2 text-cyan-500 font-semibold mb-2">

                    <Sparkles size={20} />

                    AI Generated Roadmap

                  </div>

                  <h2 className="text-3xl font-bold">

                    {roadmapData.targetRole ||
                      targetRole}

                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 mt-2">

                    {roadmapData.duration ||
                      duration}{" "}
                    •{" "}
                    {roadmapData.experience ||
                      experience}

                  </p>

                </div>

                <button
                  onClick={handleCreateNewRoadmap}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:border-cyan-500 transition font-semibold"
                >

                  <RefreshCw size={18} />

                  Create New Roadmap

                </button>

              </div>

              {roadmapData.summary && (

                <div className="mt-6 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70">

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">

                    {roadmapData.summary}

                  </p>

                </div>

              )}

            </div>

            {/* =================================================
                SKILL GAP
            ================================================= */}

            {Array.isArray(
              roadmapData.skillGap
            ) &&
              roadmapData.skillGap.length > 0 && (

                <section>

                  <div className="flex items-center gap-3 mb-5">

                    <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">

                      <Target size={25} />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        Your Skill Gap
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400">
                        Skills identified by AI for your
                        target role
                      </p>

                    </div>

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    {roadmapData.skillGap.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <h3 className="text-lg font-bold">

                              {item.skill}

                            </h3>

                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-500">

                              {item.importance ||
                                "Important"}

                            </span>

                          </div>

                          <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">

                            {item.reason}

                          </p>

                        </div>

                      )
                    )}

                  </div>

                </section>

              )}

            {/* =================================================
                WEEKLY ROADMAP
            ================================================= */}

            {Array.isArray(
              roadmapData.roadmap
            ) &&
              roadmapData.roadmap.length > 0 && (

                <section>

                  <div className="flex items-center gap-3 mb-6">

                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">

                      <Map size={25} />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        Weekly Learning Plan
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400">
                        Your AI-generated preparation journey
                      </p>

                    </div>

                  </div>

                  <div className="space-y-6">

                    {roadmapData.roadmap.map(
                      (week, index) => (

                        <div
                          key={index}
                          className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-7 shadow-sm"
                        >

                          {/* Week Header */}

                          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">

                             <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-bold text-lg">

                                {week.week ||
                                  index + 1}

                              </div>

                              <div className="flex-1">

                                <p className="text-sm text-cyan-500 font-semibold uppercase tracking-wide">

                                  Week{" "}
                                  {week.week ||
                                    index + 1}

                                </p>

                                  <h3 className="text-2xl font-bold">

                                    {week.title}

                                  </h3>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  handleWeekCompletion(index)
                                }
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
                                  completedWeeks.includes(index)
                                    ? "bg-green-500 text-white"
                                    : "bg-cyan-500 text-white hover:bg-cyan-600"
                                }`}
                              >

                              <CheckCircle size={18} />

                              {completedWeeks.includes(index)
                                ? "Completed"
                                : "Complete Week"}

                              </button>

                            </div>

                          {/* Goal */}

                          {week.goal && (

                            <div className="mb-6 p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">

                              <div className="flex items-center gap-2 font-semibold mb-2">

                                <Target
                                  size={18}
                                  className="text-cyan-500"
                                />

                                Weekly Goal

                              </div>

                              <p className="text-gray-600 dark:text-gray-400">

                                {week.goal}

                              </p>

                            </div>

                          )}

                          <div className="grid md:grid-cols-2 gap-6">

                            {/* Topics */}

                            {Array.isArray(
                              week.topics
                            ) &&
                              week.topics.length > 0 && (

                                <div>

                                  <div className="flex items-center gap-2 font-bold mb-3">

                                    <BookOpen
                                      size={19}
                                      className="text-blue-500"
                                    />

                                    Topics to Study

                                  </div>

                                  <ul className="space-y-2">

                                    {week.topics.map(
                                      (
                                        topic,
                                        topicIndex
                                      ) => (

                                        <li
                                          key={
                                            topicIndex
                                          }
                                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                                        >

                                          <CheckCircle
                                            size={17}
                                            className="text-green-500 mt-1 flex-shrink-0"
                                          />

                                          <span>
                                            {topic}
                                          </span>

                                        </li>

                                      )
                                    )}

                                  </ul>

                                </div>

                              )}

                            {/* Tasks */}

                            {Array.isArray(
                              week.tasks
                            ) &&
                              week.tasks.length > 0 && (

                                <div>

                                  <div className="flex items-center gap-2 font-bold mb-3">

                                    <CheckCircle
                                      size={19}
                                      className="text-green-500"
                                    />

                                    Practical Tasks

                                  </div>

                                  <ul className="space-y-2">

                                    {week.tasks.map(
                                      (
                                        task,
                                        taskIndex
                                      ) => (

                                        <li
                                          key={
                                            taskIndex
                                          }
                                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                                        >

                                          <span className="text-cyan-500 mt-1">
                                            •
                                          </span>

                                          <span>
                                            {task}
                                          </span>

                                        </li>

                                      )
                                    )}

                                  </ul>

                                </div>

                              )}

                          </div>

                          {/* Project */}

                          {week.project && (

                            <div className="mt-6 p-5 rounded-2xl bg-purple-500/5 border border-purple-500/10">

                              <div className="flex items-center gap-2 font-bold mb-2">

                                <FolderGit2
                                  size={19}
                                  className="text-purple-500"
                                />

                                Project / Practice

                              </div>

                              <p className="text-gray-600 dark:text-gray-400">

                                {week.project}

                              </p>

                            </div>

                          )}

                          {/* Interview Preparation */}

                          {Array.isArray(
                            week.interviewPrep
                          ) &&
                            week.interviewPrep.length >
                              0 && (

                              <div className="mt-6">

                                <div className="flex items-center gap-2 font-bold mb-3">

                                  <MessageSquare
                                    size={19}
                                    className="text-pink-500"
                                  />

                                  Interview Preparation

                                </div>

                                <div className="grid sm:grid-cols-2 gap-3">

                                  {week.interviewPrep.map(
                                    (
                                      prep,
                                      prepIndex
                                    ) => (

                                      <div
                                        key={
                                          prepIndex
                                        }
                                        className="flex items-start gap-2 p-3 rounded-xl bg-pink-500/5"
                                      >

                                        <CheckCircle
                                          size={17}
                                          className="text-pink-500 mt-0.5 flex-shrink-0"
                                        />

                                        <span className="text-gray-600 dark:text-gray-400">

                                          {prep}

                                        </span>

                                      </div>

                                    )
                                  )}

                                </div>

                              </div>

                            )}

                        </div>

                      )
                    )}

                  </div>

                </section>

              )}

            {/* =================================================
                PROJECTS
            ================================================= */}

            {Array.isArray(
              roadmapData.projects
            ) &&
              roadmapData.projects.length > 0 && (

                <section>

                  <div className="flex items-center gap-3 mb-5">

                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">

                      <FolderGit2 size={25} />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        Portfolio Projects
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400">
                        Projects suggested by AI for your
                        preparation
                      </p>

                    </div>

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    {roadmapData.projects.map(
                      (project, index) => (

                        <div
                          key={index}
                          className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
                        >

                          <h3 className="text-xl font-bold">

                            {project.title}

                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">

                            {project.description}

                          </p>

                          {Array.isArray(
                            project.skills
                          ) &&
                            project.skills.length >
                              0 && (

                              <div className="flex flex-wrap gap-2 mt-5">

                                {project.skills.map(
                                  (
                                    skill,
                                    skillIndex
                                  ) => (

                                    <span
                                      key={
                                        skillIndex
                                      }
                                      className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium"
                                    >

                                      {skill}

                                    </span>

                                  )
                                )}

                              </div>

                            )}

                        </div>

                      )
                    )}

                  </div>

                </section>

              )}

            {/* =================================================
                INTERVIEW PREPARATION
            ================================================= */}

            {Array.isArray(
              roadmapData.interviewPreparation
            ) &&
              roadmapData.interviewPreparation.length >
                0 && (

                <section>

                  <div className="flex items-center gap-3 mb-5">

                    <div className="p-3 rounded-xl bg-pink-500/10 text-pink-500">

                      <MessageSquare size={25} />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        Interview Preparation
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400">
                        AI recommendations for your
                        interview preparation
                      </p>

                    </div>

                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-7">

                    <div className="space-y-4">

                      {roadmapData.interviewPreparation.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800"
                          >

                            <div className="mt-1 text-pink-500">

                              <CheckCircle
                                size={20}
                              />

                            </div>

                            <p className="text-gray-700 dark:text-gray-300">

                              {item}

                            </p>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                </section>

              )}

            {/* =================================================
                FINAL ADVICE
            ================================================= */}

            {roadmapData.finalAdvice && (

              <section>

                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl p-8">

                  <div className="flex items-center gap-3 mb-4">

                    <Lightbulb
                      size={25}
                      className="text-yellow-500"
                    />

                    <h2 className="text-2xl font-bold">
                      AI Career Advice
                    </h2>

                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">

                    {roadmapData.finalAdvice}

                  </p>

                </div>

              </section>

            )}

          </div>

        )}

      </main>

    </div>
  );
}

export default LearningRoadmap;