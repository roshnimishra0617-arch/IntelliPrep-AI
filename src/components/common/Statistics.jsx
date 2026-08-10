function Statistics() {
  const stats = [
    { number: "10K+", label: "Students Prepared" },
    { number: "500+", label: "Partner Companies" },
    { number: "50K+", label: "Mock Interviews" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <section className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md hover:bg-cyan-500 hover:text-white transition duration-300"
            >
              <h2 className="text-4xl font-bold text-cyan-500 dark:text-cyan-400">
                {stat.number}
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;