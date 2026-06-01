"use client";

import MentorCard from "@/components/cards/MentorCard";

export default function MentorChatPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

      {/* MASSIVE BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 overflow-hidden">

        {/* PURPLE GLOW */}
        <div className="absolute top-[-250px] left-[-180px] w-[700px] h-[700px] rounded-full bg-purple-500/20 blur-[180px]" />

        {/* CYAN GLOW */}
        <div className="absolute top-[15%] right-[-220px] w-[650px] h-[650px] rounded-full bg-cyan-500/15 blur-[180px]" />

        {/* BOTTOM GLOW */}
        <div className="absolute bottom-[-300px] left-[20%] w-[700px] h-[700px] rounded-full bg-fuchsia-500/10 blur-[200px]" />

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]" />

      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-12">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur-xl mb-6">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm text-purple-200">
              AI Mentor Online
            </span>

          </div>

          <h1 className="text-6xl xl:text-7xl font-black tracking-tight leading-none">

            AI Mentor

            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mt-2">
              Career Intelligence
            </span>

          </h1>

          <p className="mt-8 text-xl xl:text-2xl text-white/55 max-w-4xl leading-relaxed">
            Your personalized AI mentor for coding, DSA,
            placements, AI/ML, interviews, projects,
            and career guidance with real-time intelligent assistance.
          </p>

        </div>

        {/* CHAT UI */}
        <MentorCard />

      </div>

    </div>
  );
}