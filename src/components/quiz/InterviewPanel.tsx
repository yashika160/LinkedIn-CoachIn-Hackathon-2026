export default function InterviewPanel() {
  return (
    <div className="space-y-6">

      <div className="glass rounded-3xl p-8">

        <h2 className="text-2xl font-bold">
          AI Interview Feedback
        </h2>

        <div className="mt-8 space-y-5">

          <div className="rounded-2xl bg-green-500/10 p-5">
            <h3 className="font-semibold text-green-600 dark:text-green-400">
              Strengths
            </h3>

            <p className="mt-3 text-gray-400">
              Strong React fundamentals and component architecture knowledge.
            </p>
          </div>

          <div className="rounded-2xl bg-red-500/10 p-5">
            <h3 className="font-semibold text-red-600 dark:text-red-400">
              Improvement Areas
            </h3>

            <p className="mt-3 text-gray-400">
              Practice system design and backend scalability concepts.
            </p>
          </div>

        </div>

      </div>

      <div className="glass rounded-3xl p-8">

        <h2 className="text-2xl font-bold">
          Coding Challenge
        </h2>

        <p className="mt-5 leading-7 text-gray-400">
          Build a responsive dashboard using React and Tailwind CSS.
        </p>

        <button className="mt-8 w-full rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-black transition hover:bg-cyan-400">
          Start Challenge
        </button>

      </div>

    </div>
  );
}