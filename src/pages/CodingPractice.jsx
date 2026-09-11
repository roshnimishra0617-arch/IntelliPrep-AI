import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Code2,
  ChevronRight,
  Sparkles,
  Loader2,
  Send,
} from "lucide-react";
import { useState } from "react";

const technologies = [
  {
    name: "Python",
    icon: "🐍",
    description: "Practice Python programming and problem solving.",
  },
  {
    name: "Java",
    icon: "☕",
    description:
      "Practice Java programming and technical interview problems.",
  },
  {
    name: "C++",
    icon: "💻",
    description:
      "Practice C++ and algorithmic problem solving.",
  },
  {
    name: "JavaScript",
    icon: "🟨",
    description:
      "Practice JavaScript programming and technical problems.",
  },
  {
    name: "C",
    icon: "🔵",
    description:
      "Practice C programming and fundamental algorithms.",
  },
  {
    name: "C#",
    icon: "🟣",
    description:
      "Practice C# programming and object-oriented concepts.",
  },
];

const difficulties = [
  {
    name: "Easy",
    description: "Beginner-friendly problems.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    name: "Medium",
    description: "Intermediate interview problems.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    name: "Hard",
    description: "Advanced technical interview problems.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

const questionCounts = [5, 10, 15, 20];

function CodingPractice() {
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [solution, setSolution] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // TECHNOLOGY SELECTION
  // ==========================================

  const handleTechnologySelect = (technology) => {
    setSelectedTechnology(technology);
    setSelectedDifficulty("");
    setSelectedQuestionCount(5);

    setQuestions([]);
    setSelectedQuestion(null);
    setSolution("");
    setEvaluation(null);
    setError("");
  };

  // ==========================================
  // DIFFICULTY SELECTION
  // ==========================================

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setSelectedQuestionCount(5);

    setQuestions([]);
    setSelectedQuestion(null);
    setSolution("");
    setEvaluation(null);
    setError("");
  };

  // ==========================================
  // QUESTION COUNT SELECTION
  // ==========================================

  const handleQuestionCountSelect = (count) => {
    setSelectedQuestionCount(count);
    setError("");
  };

  // ==========================================
  // GENERATE QUESTIONS
  // ==========================================

   const generateQuestions = async () => {
  if (!selectedTechnology) {
    setError("Please select a technology.");
    return;
  }

  if (!selectedDifficulty) {
    setError("Please select a difficulty.");
    return;
  }

  if (!selectedQuestionCount) {
    setError("Please select the number of questions.");
    return;
  }

  try {
    setLoading(true);
    setError("");
    setQuestions([]);
    setSelectedQuestion(null);
    setSolution("");
    setEvaluation(null);

    const response = await fetch(
      "http://localhost:5000/api/generate-coding-questions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technology: selectedTechnology,
          difficulty: selectedDifficulty,
          questionCount: selectedQuestionCount,
        }),
      }
    );

    // Read response as text first
    const responseText = await response.text();

    console.log("Coding API Status:", response.status);
    console.log("Coding API Response:", responseText);

    let data;

    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(
        "Backend returned an invalid response. Please make sure the backend is running on http://localhost:5000."
      );
    }

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to generate coding questions."
      );
    }

    if (!Array.isArray(data.questions)) {
      throw new Error("Invalid questions received from backend.");
    }

    setQuestions(data.questions);
  } catch (err) {
    console.error("Coding question generation error:", err);

    setError(
      err.message || "Unable to generate coding questions."
    );
  } finally {
    setLoading(false);
  }
};
  // ==========================================
  // BACK TO TECHNOLOGY
  // ==========================================

  const handleBackToTechnologies = () => {
    setSelectedTechnology("");
    setSelectedDifficulty("");
    setSelectedQuestionCount(5);

    setQuestions([]);
    setSelectedQuestion(null);
    setSolution("");
    setEvaluation(null);
    setError("");
  };

  // ==========================================
  // BACK TO DIFFICULTY
  // ==========================================

  const handleBackToDifficulty = () => {
    setSelectedDifficulty("");
    setSelectedQuestionCount(5);

    setQuestions([]);
    setSelectedQuestion(null);
    setSolution("");
    setEvaluation(null);
    setError("");
  };

  // ==========================================
  // BACK TO QUESTION COUNT
  // ==========================================

  const handleBackToQuestionCount = () => {
    setQuestions([]);
    setSelectedQuestion(null);
    setSolution("");
    setEvaluation(null);
    setError("");
  };

  // ==========================================
  // QUESTION SELECTION
  // ==========================================

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setSolution("");
    setEvaluation(null);
    setError("");
  };

  // ==========================================
  // SUBMIT SOLUTION
  // ==========================================

   const handleSubmitSolution = async () => {
  if (!solution.trim()) {
    setError("Please write your solution before submitting.");
    return;
  }

  if (!selectedQuestion) {
    setError("Please select a question first.");
    return;
  }

  try {
    setEvaluating(true);
    setError("");
    setEvaluation(null);

    const response = await fetch(
      "http://localhost:5000/api/evaluate-coding-solution",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technology: selectedTechnology,
          difficulty: selectedDifficulty,
          question: selectedQuestion,
          solution: solution,
        }),
      }
    );

    const responseText = await response.text();

    console.log("Evaluation API Status:", response.status);
    console.log("Evaluation API Response:", responseText);

    let data;

    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(
        "Backend returned an invalid response while evaluating your solution."
      );
    }

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to evaluate solution."
      );
    }

    setEvaluation(data.evaluation);
  } catch (err) {
    console.error(
      "Coding solution evaluation error:",
      err
    );

    setError(
      err.message ||
        "Unable to evaluate your solution."
    );
  } finally {
    setEvaluating(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">

        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition"
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>

          <h1 className="text-xl font-bold text-cyan-500">
            PrepVeyra-AI
          </h1>

        </div>

      </nav>

      {/* ==========================================
          MAIN
      ========================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-3">

            <Code2
              className="text-cyan-500"
              size={32}
            />

            <h1 className="text-3xl md:text-4xl font-bold">
              Coding Practice
            </h1>

          </div>

          <p className="text-gray-600 dark:text-gray-400">
            Choose your technology, difficulty and number
            of questions to generate personalized coding
            problems using AI.
          </p>

        </div>

        {/* ==========================================
            STEP 1 - TECHNOLOGY
        ========================================== */}

        {!selectedTechnology && (

          <section>

            <div className="flex items-center gap-2 mb-2">

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold">
                1
              </span>

              <h2 className="text-2xl font-bold">
                Choose a Technology
              </h2>

            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6 ml-10">
              Select the programming language you want to
              practice.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {technologies.map((technology) => (

                <button
                  key={technology.name}
                  onClick={() =>
                    handleTechnologySelect(
                      technology.name
                    )
                  }
                  className="text-left bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-md p-6 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-500 transition-all duration-300"
                >

                  <div className="flex items-center justify-between mb-5">

                    <span className="text-4xl">
                      {technology.icon}
                    </span>

                    <ChevronRight
                      className="text-gray-400"
                      size={22}
                    />

                  </div>

                  <h3 className="text-xl font-bold">
                    {technology.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mt-3 leading-6">
                    {technology.description}
                  </p>

                  <div className="mt-5 text-cyan-500 font-medium">
                    Select Technology →
                  </div>

                </button>

              ))}

            </div>

          </section>

        )}

        {/* ==========================================
            STEP 2 - DIFFICULTY
        ========================================== */}

        {selectedTechnology &&
          !selectedDifficulty && (

            <section>

              <button
                onClick={handleBackToTechnologies}
                className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-8"
              >
                <ArrowLeft size={18} />
                Change Technology
              </button>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-8">

                <p className="text-sm text-cyan-500 font-medium">
                  Selected Technology
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {selectedTechnology}
                </h2>

              </div>

              <div className="flex items-center gap-2 mb-2">

                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold">
                  2
                </span>

                <h2 className="text-2xl font-bold">
                  Choose Difficulty
                </h2>

              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 ml-10">
                Select the difficulty level for your coding
                practice.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {difficulties.map((difficulty) => (

                  <button
                    key={difficulty.name}
                    onClick={() =>
                      handleDifficultySelect(
                        difficulty.name
                      )
                    }
                    className="text-left bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-md p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  >

                    <div
                      className={`inline-flex px-4 py-2 rounded-full ${difficulty.bg} ${difficulty.color} font-semibold`}
                    >
                      {difficulty.name}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                      {difficulty.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-cyan-500 font-medium">
                      Select Difficulty
                      <ChevronRight size={17} />
                    </div>

                  </button>

                ))}

              </div>

            </section>

          )}

        {/* ==========================================
            STEP 3 - QUESTION COUNT
        ========================================== */}

        {selectedTechnology &&
          selectedDifficulty &&
          questions.length === 0 &&
          !loading &&
          !selectedQuestion && (

            <section>

              <button
                onClick={handleBackToDifficulty}
                className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-8"
              >
                <ArrowLeft size={18} />
                Change Difficulty
              </button>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-8">

                <p className="text-sm text-cyan-500 font-medium">
                  Practice Session
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {selectedTechnology} ·{" "}
                  {selectedDifficulty}
                </h2>

              </div>

              <div className="flex items-center gap-2 mb-2">

                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold">
                  3
                </span>

                <h2 className="text-2xl font-bold">
                  Choose Number of Questions
                </h2>

              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 ml-10">
                Choose how many AI-generated coding
                questions you want to practice.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                {questionCounts.map((count) => (

                  <button
                    key={count}
                    onClick={() =>
                      handleQuestionCountSelect(count)
                    }
                    className={`rounded-2xl border p-6 text-center transition-all duration-300 ${
                      selectedQuestionCount === count
                        ? "border-cyan-500 bg-cyan-500/10 shadow-lg"
                        : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-cyan-500 hover:-translate-y-1"
                    }`}
                  >

                    <div className="text-4xl font-bold text-cyan-500">
                      {count}
                    </div>

                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Questions
                    </p>

                  </button>

                ))}

              </div>

              <div className="mt-8 flex justify-center">

                <button
                  onClick={generateQuestions}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-semibold transition"
                >

                  <Sparkles size={20} />

                  Generate{" "}
                  {selectedQuestionCount} Questions

                </button>

              </div>

            </section>

          )}

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (

          <div className="flex flex-col items-center justify-center py-20">

            <Loader2
              size={42}
              className="text-cyan-500 animate-spin"
            />

            <p className="mt-5 text-lg font-medium">
              Gemini is generating your questions...
            </p>

            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
              Creating {selectedQuestionCount}{" "}
              {selectedDifficulty} level{" "}
              {selectedTechnology} problems.
            </p>

          </div>

        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {error && !loading && (

          <div className="mt-6 p-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">

            <p className="font-semibold">
              Error
            </p>

            <p className="mt-1">
              {error}
            </p>

          </div>

        )}

        {/* ==========================================
            STEP 4 - QUESTIONS
        ========================================== */}

        {selectedTechnology &&
          selectedDifficulty &&
          !loading &&
          !selectedQuestion &&
          questions.length > 0 && (

            <section>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

                <button
                  onClick={handleBackToQuestionCount}
                  className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400"
                >
                  <ArrowLeft size={18} />
                  Change Question Count
                </button>

                <div className="flex items-center gap-2 text-cyan-500">
                  <Sparkles size={18} />

                  <span className="font-medium">
                    AI Generated
                  </span>
                </div>

              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-8">

                <p className="text-sm text-cyan-500 font-medium">
                  Practice Session
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {selectedTechnology} ·{" "}
                  {selectedDifficulty}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {questions.length} questions generated.
                  Select a question to begin your practice.
                </p>

              </div>

              <h2 className="text-2xl font-bold mb-5">
                AI Generated Questions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {questions.map((question, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      handleQuestionSelect(question)
                    }
                    className="text-left bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-md p-6 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-500 transition-all duration-300"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-500">
                        {question.difficulty}
                      </span>

                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {question.topic}
                      </span>

                    </div>

                    <h3 className="text-xl font-bold">
                      {index + 1}. {question.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mt-3 leading-6">
                      {question.description}
                    </p>

                    <div className="mt-5 text-cyan-500 font-medium">
                      Solve Problem →
                    </div>

                  </button>

                ))}

              </div>

            </section>

          )}

        {/* ==========================================
            STEP 5 - SELECTED QUESTION
        ========================================== */}

        {selectedQuestion && (

          <section>

            <button
              onClick={() => {
                setSelectedQuestion(null);
                setSolution("");
                setEvaluation(null);
                setError("");
              }}
              className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-6"
            >
              <ArrowLeft size={18} />
              Back to Questions
            </button>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-md p-8">

              <div className="flex flex-wrap items-center gap-3 mb-6">

                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500">
                  {selectedTechnology}
                </span>

                <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
                  {selectedDifficulty}
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500">
                  {selectedQuestion.topic}
                </span>

              </div>

              <h2 className="text-3xl font-bold mb-5">
                {selectedQuestion.title}
              </h2>

              <h3 className="text-xl font-semibold mb-2">
                Problem
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-7">
                {selectedQuestion.description}
              </p>

              {selectedQuestion.constraints?.length > 0 && (

                <div className="mt-6">

                  <h3 className="text-xl font-semibold mb-3">
                    Constraints
                  </h3>

                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">

                    {selectedQuestion.constraints.map(
                      (constraint, index) => (

                        <li key={index}>
                          {constraint}
                        </li>

                      )
                    )}

                  </ul>

                </div>

              )}

              <div className="mt-6">

                <h3 className="text-xl font-semibold mb-3">
                  Example
                </h3>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-5 font-mono text-sm">

                  <p>
                    Input:{" "}
                    {selectedQuestion.exampleInput}
                  </p>

                  <p className="mt-3">
                    Output:{" "}
                    {selectedQuestion.exampleOutput}
                  </p>

                </div>

              </div>

              {/* ==========================================
                  SOLUTION EDITOR
              ========================================== */}

              <div className="mt-8">

                <div className="flex items-center justify-between mb-3">

                  <h3 className="text-xl font-semibold">
                    Your Solution
                  </h3>

                  <span className="text-sm text-gray-500">
                    {selectedTechnology}
                  </span>

                </div>

                <textarea
                  value={solution}
                  onChange={(e) => {
                    setSolution(e.target.value);
                    setEvaluation(null);
                    setError("");
                  }}
                  placeholder={`Write your ${selectedTechnology} solution here...`}
                  className="w-full min-h-[300px] bg-slate-950 text-green-400 border border-slate-700 rounded-xl p-5 font-mono text-sm outline-none focus:border-cyan-500 resize-y"
                  spellCheck="false"
                />

                <div className="flex justify-end mt-4">

                  <button
                    onClick={handleSubmitSolution}
                    disabled={evaluating}
                    className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-7 py-3 rounded-xl font-semibold transition"
                  >

                    {evaluating ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Send size={20} />

                        Submit Solution
                      </>
                    )}

                  </button>

                </div>

              </div>

              {/* ==========================================
                  AI EVALUATION
              ========================================== */}

              {evaluation && (

                <div className="mt-8 border border-cyan-500/20 rounded-2xl p-6 bg-cyan-500/5">

                  <div className="flex items-center justify-between mb-6">

                    <h3 className="text-2xl font-bold">
                      AI Evaluation
                    </h3>

                    <div className="text-3xl font-bold text-cyan-500">
                      {evaluation.score}/10
                    </div>

                  </div>

                  <div>

                    <h4 className="font-semibold text-lg mb-2">
                      Feedback
                    </h4>

                    <p className="text-gray-600 dark:text-gray-400 leading-7">
                      {evaluation.feedback}
                    </p>

                  </div>

                  {evaluation.correctness && (

                    <div className="mt-5">

                      <h4 className="font-semibold text-lg mb-2">
                        Correctness
                      </h4>

                      <p className="text-gray-600 dark:text-gray-400">
                        {evaluation.correctness}
                      </p>

                    </div>

                  )}

                  {evaluation.complexity && (

                    <div className="mt-5">

                      <h4 className="font-semibold text-lg mb-2">
                        Complexity
                      </h4>

                      <p className="text-gray-600 dark:text-gray-400">
                        {evaluation.complexity}
                      </p>

                    </div>

                  )}

                  {evaluation.strengths?.length > 0 && (

                    <div className="mt-5">

                      <h4 className="font-semibold text-lg mb-2">
                        Strengths
                      </h4>

                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">

                        {evaluation.strengths.map(
                          (strength, index) => (
                            <li key={index}>
                              {strength}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                  )}

                  {evaluation.improvements?.length > 0 && (

                    <div className="mt-5">

                      <h4 className="font-semibold text-lg mb-2">
                        Improvements
                      </h4>

                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">

                        {evaluation.improvements.map(
                          (improvement, index) => (
                            <li key={index}>
                              {improvement}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                  )}

                </div>

              )}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default CodingPractice;