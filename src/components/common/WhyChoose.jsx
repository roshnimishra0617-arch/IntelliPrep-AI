function WhyChoose() {
  const reasons = [
    {
      title: "AI-Powered Guidance",
      text: "Receive smart feedback and personalized recommendations.",
    },
    {
      title: "Track Your Progress",
      text: "Monitor your learning journey with detailed analytics.",
    },
    {
      title: "All-in-One Preparation",
      text: "Coding, aptitude, resume analysis, and mock interviews in one place.",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-20 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          Why Choose IntelliPrep-AI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-cyan-50 dark:hover:bg-slate-700 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400 mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChoose;