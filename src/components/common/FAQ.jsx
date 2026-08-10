import { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      question: "What is IntelliPrep-AI?",
      answer:
        "IntelliPrep-AI is an AI-powered platform designed to help students and job seekers prepare for interviews, coding rounds, aptitude tests, and resume screening.",
    },
    {
      question: "How does the AI interview work?",
      answer:
        "The platform generates interview questions based on your selected role and provides feedback on your answers to help you improve.",
    },
    {
      question: "Can IntelliPrep-AI analyze my resume?",
      answer:
        "Yes. The Resume Analyzer will evaluate your resume and provide suggestions to improve its content and ATS compatibility.",
    },
    {
      question: "Can I track my preparation progress?",
      answer:
        "Yes. Your dashboard will provide progress information across interviews, coding practice, aptitude tests, and other preparation activities.",
    },
    {
      question: "Is IntelliPrep-AI suitable for beginners?",
      answer:
        "Yes. The platform is designed for learners at different skill levels and can provide personalized preparation guidance.",
    },
  ];

  return (
    <section
      id="faq"
      className="bg-slate-100 dark:bg-slate-950 py-20 px-6 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-4 mb-10">
          Everything you need to know about IntelliPrep-AI.
        </p>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center text-left px-6 py-5 font-semibold text-lg text-slate-900 dark:text-white"
              >
                <span>{item.question}</span>

                <span className="text-cyan-500 text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-7">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;