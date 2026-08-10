function Contact() {
  return (
    <section
      id="contact"
      className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-20 px-6 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Get in Touch
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl p-8 border border-gray-200 dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-2xl font-semibold text-cyan-500 dark:text-cyan-400 mb-6">
              Let's Connect
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-8">
              Whether you have a question, suggestion, or want to learn
              more about IntelliPrep-AI, feel free to reach out.
            </p>

            <div className="space-y-5">
              <p>📧 support@intelliprep-ai.com</p>
              <p>💼 LinkedIn</p>
              <p>🐙 GitHub</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-5">

            <div>
              <label className="block mb-2 font-medium text-slate-900 dark:text-white">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-gray-400 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-900 dark:text-white">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-gray-400 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-900 dark:text-white">
                Message
              </label>

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-gray-400 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
              />
            </div>

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;