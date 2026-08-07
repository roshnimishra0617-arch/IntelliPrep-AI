import Features from "../components/common/Features";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhyChoose from "../components/common/WhyChoose";
import Hero from "../components/common/Hero";
import Statistics from "../components/common/Statistics";
import Testimonials from "../components/common/Testimonials";

function Home() {
  return (
    <>
      <Navbar />

       <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-white flex flex-col justify-center items-center px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-cyan-400 mb-6 text-center">
          Ace Your Dream Job 🚀
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl leading-relaxed">
          Prepare smarter with AI-driven mock interviews, resume analysis,
          coding challenges, aptitude tests and personalized carrer guidance.
        </p>

        <div className="mt-8 flex gap-4">
           <button className="bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl font-semibold shadow-lg">
             Get Started
            </button>

           <button className="border border-cyan-500 hover:bg-cyan-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl">
            Explore Features
            </button>
        </div>
      </section>
      <Hero />
      <Statistics />
      <Features />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;