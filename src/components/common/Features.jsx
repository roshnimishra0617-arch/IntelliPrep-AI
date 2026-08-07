function Features() {
  const features = [
    {
      title: "AI Interview",
      description: "Practice HR and technical interviews with AI-powered feedback.",
      icon: "🤖",
    },
    {
      title: "Resume Analyzer",
      description: "Improve your resume with AI suggestions.",
      icon: "📄",
    },
    {
      title: "Coding Practice",
      description: "Solve coding problems and prepare for technical rounds.",
      icon: "💻",
    },
    {
      title: "Aptitude Tests",
      description: "Practice quantitative, logical, and verbal reasoning.",
      icon: "📝",
    },
    {
      title: "Progress Tracker",
      description: "Monitor your interview preparation journey.",
      icon: "📊",
    },
    {
      title: "Learning Roadmap",
      description: "Get personalized preparation plans for your dream role.",
      icon: "🎯",
    },
  ];

  return (
    <section
     id="features"
     className="bg-gray-100 py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Our Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition duration-300"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>

            <h3 className="text-2xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;