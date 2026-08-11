import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setError("");
    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a PDF resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        "http://localhost:5000/api/analyze-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to analyze resume."
        );
      }

      setResult(data.analysis);
    } catch (err) {
      console.error("Resume analysis error:", err);

      setError(
        err.message ||
          "Unable to connect to the Resume Analyzer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white">

      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <Link
            to="/dashboard"
            className="text-2xl font-bold text-cyan-500"
          >
            IntelliPrep-AI
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

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="flex justify-center mb-5">
            <div className="p-5 rounded-2xl bg-cyan-500/10 text-cyan-500">
              <Sparkles size={48} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Resume Analyzer
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Upload your resume and get AI-powered ATS analysis,
            skills detection, strengths, weaknesses, and
            improvement suggestions.
          </p>

        </div>

        {/* Upload Card */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 p-8">

          <label
            htmlFor="resume-upload"
            className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition"
          >

            <Upload
              size={42}
              className="text-cyan-500 mb-4"
            />

            <h2 className="text-xl font-semibold">
              Upload your resume
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm text-center">
              PDF only · Maximum size 5 MB
            </p>

            <input
              id="resume-upload"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />

          </label>

          {/* Selected File */}
          {file && (
            <div className="mt-6 flex items-center justify-between gap-4 bg-slate-100 dark:bg-slate-800 rounded-xl p-4">

              <div className="flex items-center gap-3 min-w-0">
                <FileText
                  size={24}
                  className="text-cyan-500 shrink-0"
                />

                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <CheckCircle
                size={22}
                className="text-green-500 shrink-0"
              />

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 flex items-start gap-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl p-4">

              <AlertCircle
                size={20}
                className="shrink-0 mt-0.5"
              />

              <p>{error}</p>

            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-semibold transition"
          >

            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Analyze Resume
              </>
            )}

          </button>

        </div>

        {/* Results */}
        {result && (
          <div className="mt-12 space-y-8">

            {/* ATS Score */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-8 text-center">

              <h2 className="text-2xl font-bold mb-6">
                ATS Score
              </h2>

              <div className="text-6xl font-bold text-cyan-500">
                {result.atsScore}
                <span className="text-3xl text-gray-400">
                  /100
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                {result.summary}
              </p>

            </div>

            {/* Skills */}
            <ResultSection
              title="Skills Detected"
              items={result.skills}
              badge
            />

            {/* Strengths */}
            <ResultSection
              title="Strengths"
              items={result.strengths}
            />

            {/* Weaknesses */}
            <ResultSection
              title="Weaknesses"
              items={result.weaknesses}
            />

            {/* Missing Keywords */}
            <ResultSection
              title="Missing Keywords"
              items={result.missingKeywords}
              badge
            />

            {/* Improvements */}
            <ResultSection
              title="Recommended Improvements"
              items={result.improvements}
            />

            {/* Section Analysis */}
            {result.sections && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-8">

                <h2 className="text-2xl font-bold mb-6">
                  Resume Sections
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

                  {Object.entries(result.sections).map(
                    ([section, status]) => (
                      <div
                        key={section}
                        className="bg-slate-100 dark:bg-slate-800 rounded-xl p-5"
                      >
                        <p className="capitalize font-semibold">
                          {section}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {status}
                        </p>
                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}

function ResultSection({
  title,
  items = [],
  badge = false,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-8">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No information available.
        </p>
      ) : badge ? (
        <div className="flex flex-wrap gap-3">
          {items.map((item, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-gray-600 dark:text-gray-300"
            >
              <span className="text-cyan-500 font-bold">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default ResumeAnalyzer;