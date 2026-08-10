import { Link } from "react-router-dom";

import Features from "../components/common/Features";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhyChoose from "../components/common/WhyChoose";
import Hero from "../components/common/Hero";
import Statistics from "../components/common/Statistics";
import Testimonials from "../components/common/Testimonials";
import FAQ from "../components/common/FAQ";
import Contact from "../components/common/Contact";

function Home() {
  return (
    <>
      <Navbar />

      {/* Main Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-900 text-slate-900 dark:text-white flex flex-col justify-center items-center px-6 transition-colors duration-300">

        <h1 className="text-6xl md:text-7xl font-extrabold text-cyan-500 dark:text-cyan-400 mb-6 text-center">
          Ace Your Dream Job 🚀
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center max-w-3xl leading-relaxed">
          Prepare smarter with AI-driven mock interviews, resume analysis,
          coding challenges, aptitude tests and personalized career guidance.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          {/* Get Started */}
          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl font-semibold shadow-lg text-white"
          >
            Get Started
          </Link>

          {/* Explore Features */}
          <a
            href="#features"
            className="border border-cyan-500 text-slate-900 dark:text-white hover:bg-cyan-500 hover:text-white hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl"
          >
            Explore Features
          </a>

        </div>
      </section>

      {/* Hero Features Section */}
      <Hero />

      {/* Statistics */}
      <Statistics />

      {/* Features */}
      <Features />

      {/* Why Choose IntelliPrep-AI */}
      <WhyChoose />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;