"use client";

import Robot from "@/components/animations/Robot";

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center bg-card text-foreground px-6 md:px-20 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 z-10">

        {/* LEFT SIDE */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            AI Career Mentor <br /> for Future Builders 🚀
          </h1>

          <p className="mt-5 text-foreground/70 text-lg max-w-md">
            Learn faster with AI-powered roadmaps, interview prep, quizzes,
            and personalized career guidance.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition">
              Get Started
            </button>

            <button className="px-6 py-3 border border-white/20 hover:border-white/40 rounded-xl transition">
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (ROBOT) */}
        <div className="flex-1 flex justify-center items-center relative">
          <Robot />
        </div>

      </div>
    </section>
  );
}