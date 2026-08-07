import { ArrowRight, BrainCircuit, FileText, Code2 } from "lucide-react";

function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Section */}
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium">
            🚀 AI-Powered Career Preparation Platform
          </span>

          <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-tight">
            Prepare Smarter.
            <br />
            <span className="text-cyan-400">
              Crack Interviews Faster.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-8">
            IntelliPrep-AI helps students and professionals prepare for
            interviews with AI-powered mock interviews, resume analysis,
            coding practice, aptitude tests, and personalized learning
            roadmaps.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-7 py-4 rounded-xl font-semibold transition">
              Get Started
              <ArrowRight size={20} />
            </button>

            <button className="border border-cyan-500 hover:bg-cyan-500 px-7 py-4 rounded-xl transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative">

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

            <div className="flex items-center gap-4 bg-slate-800 rounded-xl p-4 mb-5">
              <BrainCircuit className="text-cyan-400" />
              <div>
                <h3 className="font-semibold">AI Interview</h3>
                <p className="text-gray-400 text-sm">
                  Performance Score: 92%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-800 rounded-xl p-4 mb-5">
              <FileText className="text-green-400" />
              <div>
                <h3 className="font-semibold">Resume Analyzer</h3>
                <p className="text-gray-400 text-sm">
                  ATS Score: 88%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-800 rounded-xl p-4">
              <Code2 className="text-yellow-400" />
              <div>
                <h3 className="font-semibold">Coding Practice</h3>
                <p className="text-gray-400 text-sm">
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