import { ArrowRight, BrainCircuit, FileText, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Section */}
        <div>
          <span className="inline-block bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 px-4 py-2 rounded-full text-sm font-medium">
            🚀 AI-Powered Career Preparation Platform
          </span>

          <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-tight">
            Prepare Smarter.
            <br />
            <span className="text-cyan-500 dark:text-cyan-400">
              Crack Interviews Faster.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-8">
            IntelliPrep-AI helps students and professionals prepare for
            interviews with AI-powered mock interviews, resume analysis,
            coding practice, aptitude tests, and personalized learning
            roadmaps.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            {/* Get Started */}
            <Link
              to="/register"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-7 py-4 rounded-xl font-semibold transition"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            {/* Learn More */}
            <a
              href="#features"
              className="border border-cyan-500 text-slate-900 dark:text-white hover:bg-cyan-500 hover:text-white px-7 py-4 rounded-xl transition"
            >
              Learn More
            </a>

          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex justify-center">
          <div className="bg-slate-100 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-200 dark:border-white/10">

            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 mb-5 shadow-sm">
              <BrainCircuit className="text-cyan-400" />

              <div>
                <h3 className="font-semibold">AI Interview</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Performance Score: 92%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 mb-5 shadow-sm">
              <FileText className="text-green-400" />

              <div>
                <h3 className="font-semibold">Resume Analyzer</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  ATS Score: 88%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <Code2 className="text-yellow-400" />

              <div>
                <h3 className="font-semibold">Coding Practice</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Progress: 75%
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;