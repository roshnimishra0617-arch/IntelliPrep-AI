function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      review:
        "IntelliPrep-AI helped me prepare for interviews with confidence. The mock interviews were incredibly useful.",
    },
    {
      name: "Priya Verma",
      role: "Data Analyst",
      review:
        "The resume analyzer gave practical suggestions that improved my ATS score significantly.",
    },
    {
      name: "Aman Singh",
      role: "Frontend Developer",
      review:
        "Coding practice and aptitude tests in one platform made my preparation much easier.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
            >
              <p className="text-gray-600 italic">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-cyan-600">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;