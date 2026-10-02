import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  Loader2,
  Trophy,
  Target,
  RotateCcw,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

function Aptitude() {
  const [stage, setStage] = useState("setup");

  const [category, setCategory] = useState(
    "Quantitative Aptitude"
  );

  const [difficulty, setDifficulty] = useState(
    "Medium"
  );

  const [questionCount, setQuestionCount] =
    useState(5);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);

  const [result, setResult] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] =
    useState(false);

  // --------------------------------------------------
  // TIMER
  // 60 seconds per question
  // --------------------------------------------------

  useEffect(() => {
    if (stage !== "test" || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, timeLeft]);

  useEffect(() => {
    if (
      stage === "test" &&
      timeLeft === 0 &&
      questions.length > 0
    ) {
      handleSubmit();
    }
  }, [timeLeft, stage, questions.length]);

  // --------------------------------------------------
  // FORMAT TIME
  // --------------------------------------------------

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }, [timeLeft]);

  // --------------------------------------------------
  // START AI TEST
  // --------------------------------------------------

  const startTest = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
    setAiAnalysis(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-aptitude",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            difficulty,
            questionCount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to generate AI aptitude questions."
        );
      }

      if (
        !data.questions ||
        data.questions.length !== questionCount
      ) {
        throw new Error(
          "AI returned an invalid number of questions."
        );
      }

      setQuestions(data.questions);

      setTimeLeft(questionCount * 60);

      setStage("test");
    } catch (err) {
      console.error(
        "AI Aptitude Error:",
        err
      );

      setError(
        err.message ||
          "Unable to generate aptitude questions."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // SELECT ANSWER
  // --------------------------------------------------

  const selectAnswer = (answer) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));
  };

  // --------------------------------------------------
  // SUBMIT TEST
  // --------------------------------------------------

  const handleSubmit = async () => {
    if (!questions.length) {
      return;
    }

    const correctQuestions = questions.filter(
      (question, index) =>
        answers[index] ===
        question.correctAnswer
    );

    const correct = correctQuestions.length;

    const incorrect = questions.filter(
      (question, index) =>
        answers[index] &&
        answers[index] !==
          question.correctAnswer
    ).length;

    const unanswered =
      questions.length -
      correct -
      incorrect;

    const percentage = Math.round(
      (correct / questions.length) * 100
    );

    // -----------------------------------------------
    // TOPIC PERFORMANCE
    // -----------------------------------------------

    const topicData = {};

    questions.forEach((question, index) => {
      const topic =
        question.topic || "General";

      if (!topicData[topic]) {
        topicData[topic] = {
          total: 0,
          correct: 0,
        };
      }

      topicData[topic].total += 1;

      if (
        answers[index] ===
        question.correctAnswer
      ) {
        topicData[topic].correct += 1;
      }
    });

    const topicPerformance = Object.entries(
      topicData
    ).map(([topic, data]) => ({
      topic,
      total: data.total,
      correct: data.correct,
      percentage: Math.round(
        (data.correct / data.total) * 100
      ),
    }));

    const testResult = {
      score: percentage,
      correct,
      incorrect,
      unanswered,
      totalQuestions: questions.length,
      topicPerformance,
    };

    setResult(testResult);
    setStage("result");

    // -----------------------------------------------
    // ASK GEMINI FOR PERFORMANCE ANALYSIS
    // -----------------------------------------------

    analyzePerformance(testResult);
  };

  // --------------------------------------------------
  // AI PERFORMANCE ANALYSIS
  // --------------------------------------------------

  const analyzePerformance = async (
    testResult
  ) => {
    setAnalysisLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/analyze-aptitude",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            difficulty,
            score: testResult.score,
            totalQuestions:
              testResult.totalQuestions,
            correct: testResult.correct,
            incorrect: testResult.incorrect,
            unanswered:
              testResult.unanswered,
            topicPerformance:
              testResult.topicPerformance,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "AI analysis failed."
        );
      }

      setAiAnalysis(data.analysis);
    } catch (err) {
      console.error(
        "AI Performance Analysis Error:",
        err
      );

      setAiAnalysis({
        summary:
          "Your test has been evaluated successfully. AI performance analysis is temporarily unavailable.",
        strengths: [],
        weakAreas: [],
        recommendations: [
          "Review the questions you answered incorrectly.",
          "Practice more questions from your weaker topics.",
          "Attempt another AI-generated aptitude test.",
        ],
        nextStep:
          "Take another practice test and compare your performance.",
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  // --------------------------------------------------
  // RESTART
  // --------------------------------------------------

  const restartTest = () => {
    setStage("setup");
    setQuestions([]);
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
    setAiAnalysis(null);
    setError("");
    setTimeLeft(0);
  };

  // --------------------------------------------------
  // SETUP SCREEN
  // --------------------------------------------------

  if (stage === "setup") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white">

        <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">

            <Link
              to="/dashboard"
              className="text-2xl font-bold text-cyan-500"
            >
              PrepVyera-AI
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-cyan-500"
            >
              <ArrowLeft size={18} />
              Dashboard
            </Link>

          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-6 py-12">

          <div className="text-center mb-10">

            <div className="flex justify-center mb-5">
              <div className="p-5 rounded-2xl bg-cyan-500/10 text-cyan-500">
                <BrainCircuit size={48} />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              AI Aptitude Test
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Practice with fresh aptitude questions
              generated dynamically by AI according to
              your selected category and difficulty.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 p-8">

            {/* CATEGORY */}

            <div className="mb-7">

              <label className="block font-semibold mb-3">
                Aptitude Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-cyan-500"
              >
                <option>
                  Quantitative Aptitude
                </option>

                <option>
                  Logical Reasoning
                </option>

                <option>
                  Verbal Ability
                </option>

                <option>
                  Data Interpretation
                </option>

                <option>
                  Mixed
                </option>
              </select>

            </div>

            {/* DIFFICULTY */}

            <div className="mb-7">

              <label className="block font-semibold mb-3">
                Difficulty
              </label>

              <div className="grid grid-cols-3 gap-3">

                {[
                  "Easy",
                  "Medium",
                  "Hard",
                ].map((level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setDifficulty(level)
                    }
                    className={`py-3 rounded-xl border font-semibold transition ${
                      difficulty === level
                        ? "bg-cyan-500 text-white border-cyan-500"
                        : "border-gray-300 dark:border-slate-700 hover:border-cyan-500"
                    }`}
                  >
                    {level}
                  </button>
                ))}

              </div>

            </div>

            {/* QUESTION COUNT */}

            <div className="mb-8">

              <label className="block font-semibold mb-3">
                Number of Questions
              </label>

              <div className="grid grid-cols-3 gap-3">

                {[5, 10, 15].map((count) => (
                  <button
                    key={count}
                    onClick={() =>
                      setQuestionCount(count)
                    }
                    className={`py-3 rounded-xl border font-semibold transition ${
                      questionCount === count
                        ? "bg-cyan-500 text-white border-cyan-500"
                        : "border-gray-300 dark:border-slate-700 hover:border-cyan-500"
                    }`}
                  >
                    {count}
                  </button>
                ))}

              </div>

            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={startTest}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition"
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  AI is generating your test...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate AI Test
                </>
              )}
            </button>

            <div className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
              Questions are generated dynamically by
              Gemini AI for every test.
            </div>

          </div>

        </main>
      </div>
    );
  }

  // --------------------------------------------------
  // TEST SCREEN
  // --------------------------------------------------

  if (stage === "test") {
    const question =
      questions[currentQuestion];

    const answeredCount =
      Object.keys(answers).length;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white">

        <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">

          <div className="max-w-5xl mx-auto flex items-center justify-between">

            <span className="text-xl font-bold text-cyan-500">
              PrepVyera-AI
            </span>

            <div
              className={`flex items-center gap-2 font-bold ${
                timeLeft <= 30
                  ? "text-red-500"
                  : "text-cyan-500"
              }`}
            >
              <Clock size={20} />
              {formattedTime}
            </div>

          </div>

        </nav>

        <main className="max-w-4xl mx-auto px-6 py-10">

          {/* PROGRESS */}

          <div className="mb-8">

            <div className="flex justify-between text-sm mb-2">

              <span>
                Question {currentQuestion + 1} of{" "}
                {questions.length}
              </span>

              <span>
                {answeredCount} answered
              </span>

            </div>

            <div className="h-2 bg-gray-200 dark:bg-slate-800 rounded-full">

              <div
                className="h-2 bg-cyan-500 rounded-full transition-all"
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              />

            </div>

          </div>

          {/* QUESTION */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 p-8">

            <div className="flex items-center justify-between mb-6">

              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium">
                {question.topic}
              </span>

              <span className="text-sm text-gray-500">
                {question.difficulty}
              </span>

            </div>

            <h2 className="text-xl md:text-2xl font-semibold leading-relaxed mb-8">
              {question.question}
            </h2>

            <div className="space-y-4">

              {question.options.map(
                (option, index) => {

                  const selected =
                    answers[currentQuestion] ===
                    option;

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        selectAnswer(option)
                      }
                      className={`w-full text-left p-4 rounded-xl border transition ${
                        selected
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-gray-300 dark:border-slate-700 hover:border-cyan-500"
                      }`}
                    >

                      <div className="flex items-center gap-4">

                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold ${
                            selected
                              ? "bg-cyan-500 text-white"
                              : "bg-gray-100 dark:bg-slate-800"
                          }`}
                        >
                          {String.fromCharCode(
                            65 + index
                          )}
                        </span>

                        <span>
                          {option}
                        </span>

                      </div>

                    </button>
                  );
                }
              )}

            </div>

            {/* NAVIGATION */}

            <div className="flex justify-between mt-8 gap-4">

              <button
                disabled={currentQuestion === 0}
                onClick={() =>
                  setCurrentQuestion(
                    (previous) =>
                      previous - 1
                  )
                }
                className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 disabled:opacity-40"
              >
                Previous
              </button>

              {currentQuestion <
              questions.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrentQuestion(
                      (previous) =>
                        previous + 1
                    )
                  }
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
                >
                  Submit Test
                </button>
              )}

            </div>

          </div>

        </main>
      </div>
    );
  }

  // --------------------------------------------------
  // RESULT SCREEN
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white">

      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">

        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <Link
            to="/dashboard"
            className="text-2xl font-bold text-cyan-500"
          >
            PrepVyera-AI
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-cyan-500"
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>

        </div>

      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* SCORE */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 p-8 text-center">

          <div className="flex justify-center mb-5">

            <div className="p-5 rounded-full bg-cyan-500/10 text-cyan-500">
              <Trophy size={50} />
            </div>

          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Aptitude Test Completed
          </h1>

          <div className="text-6xl font-bold text-cyan-500 mt-6">
            {result.score}
            <span className="text-3xl text-gray-400">
              %
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">

            <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-950/20">

              <CheckCircle
                className="mx-auto text-green-500 mb-2"
              />

              <p className="text-2xl font-bold">
                {result.correct}
              </p>

              <p className="text-sm text-gray-500">
                Correct
              </p>

            </div>

            <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20">

              <XCircle
                className="mx-auto text-red-500 mb-2"
              />

              <p className="text-2xl font-bold">
                {result.incorrect}
              </p>

              <p className="text-sm text-gray-500">
                Incorrect
              </p>

            </div>

            <div className="p-5 rounded-2xl bg-gray-100 dark:bg-slate-800">

              <Target
                className="mx-auto text-cyan-500 mb-2"
              />

              <p className="text-2xl font-bold">
                {result.unanswered}
              </p>

              <p className="text-sm text-gray-500">
                Unanswered
              </p>

            </div>

          </div>

        </div>

        {/* TOPIC PERFORMANCE */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-8 mt-8">

          <div className="flex items-center gap-3 mb-6">

            <TrendingUp className="text-cyan-500" />

            <h2 className="text-2xl font-bold">
              Topic Performance
            </h2>

          </div>

          <div className="space-y-5">

            {result.topicPerformance.map(
              (topic) => (
                <div key={topic.topic}>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium">
                      {topic.topic}
                    </span>

                    <span className="text-sm text-gray-500">
                      {topic.correct}/
                      {topic.total} correct
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-full">

                    <div
                      className="h-3 bg-cyan-500 rounded-full"
                      style={{
                        width: `${topic.percentage}%`,
                      }}
                    />

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* AI ANALYSIS */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-8 mt-8">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles className="text-cyan-500" />

            <h2 className="text-2xl font-bold">
              AI Performance Analysis
            </h2>

          </div>

          {analysisLoading ? (
            <div className="flex items-center justify-center gap-3 py-10 text-cyan-500">

              <Loader2
                size={25}
                className="animate-spin"
              />

              Gemini is analyzing your performance...

            </div>
          ) : aiAnalysis ? (
            <div className="space-y-8">

              {/* SUMMARY */}

              <div>

                <h3 className="font-bold text-lg mb-2">
                  Overall Assessment
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {aiAnalysis.summary}
                </p>

              </div>

              {/* STRENGTHS */}

              {aiAnalysis.strengths?.length >
                0 && (
                <div>

                  <h3 className="font-bold text-lg mb-3">
                    Strengths
                  </h3>

                  <ul className="space-y-2">

                    {aiAnalysis.strengths.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex gap-3"
                        >
                          <CheckCircle
                            size={20}
                            className="text-green-500 shrink-0"
                          />

                          <span>{item}</span>
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* WEAK AREAS */}

              {aiAnalysis.weakAreas?.length >
                0 && (
                <div>

                  <h3 className="font-bold text-lg mb-3">
                    Areas to Improve
                  </h3>

                  <ul className="space-y-2">

                    {aiAnalysis.weakAreas.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex gap-3"
                        >
                          <XCircle
                            size={20}
                            className="text-red-500 shrink-0"
                          />

                          <span>{item}</span>
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* RECOMMENDATIONS */}

              <div>

                <h3 className="font-bold text-lg mb-3">
                  AI Recommendations
                </h3>

                <ul className="space-y-3">

                  {aiAnalysis.recommendations?.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex gap-3"
                      >
                        <Lightbulb
                          size={20}
                          className="text-cyan-500 shrink-0"
                        />

                        <span>{item}</span>
                      </li>
                    )
                  )}

                </ul>

              </div>

              {/* NEXT STEP */}

              <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

                <h3 className="font-bold mb-2">
                  Recommended Next Step
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {aiAnalysis.nextStep}
                </p>

              </div>

            </div>
          ) : (
            <p className="text-gray-500">
              AI analysis is unavailable.
            </p>
          )}

        </div>

        {/* ACTIONS */}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <button
            onClick={restartTest}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
          >
            <RotateCcw size={20} />
            Take Another AI Test
          </button>

          <Link
            to="/dashboard"
            className="flex items-center justify-center px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-700 font-semibold"
          >
            Back to Dashboard
          </Link>

        </div>

      </main>
    </div>
  );
}

export default Aptitude;