"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Bot } from "lucide-react";

function useTypewriter(text: string, speed = 25) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setOut(text.slice(0, i)); i++; if (i > text.length) clearInterval(t); }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return out;
}

export default function LandingPage() {
  const router = useRouter();
  const subtitle = useTypewriter("Build your career with AI-powered guidance, roadmaps, interviews & coding mastery", 20);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const sections = ["hero", "features", "mentor"];
    const handleScroll = () => {
      let current = "hero";
      sections.forEach((sec) => {
        const el = document.getElementById(sec);
        if (el && el.getBoundingClientRect().top <= 120) current = sec;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="no-select relative min-h-screen overflow-x-hidden bg-[#050816] text-white"
      onCopy={(e) => e.preventDefault()} onCut={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

      {/* TOPBAR */}
      <div className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-center py-5">
          <div className="flex gap-12 text-base font-medium md:text-lg">
            {[["hero","Try"],["features","Features"],["mentor","AI Mentor"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`transition-all duration-300 ${activeSection === id ? "text-cyan-300" : "text-gray-300 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32">
        <div className="absolute left-0 top-1/3 h-[320px] w-[320px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-16 md:flex-row">
          <motion.div initial={{ opacity: 0, x: -120 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 flex flex-1 flex-col text-center md:text-left">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6 flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              AI-Powered Career Platform
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
              className="bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-6xl font-black leading-tight text-transparent md:text-7xl xl:text-8xl">
              AIventra
            </motion.h1>

            <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}
              className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Build Your Future Faster
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              {subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9 }}
              className="mt-10 flex flex-wrap gap-5">
              <button onClick={() => router.push("/onboarding")}
                className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 px-10 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                <span className="relative z-10">Start for Free</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                <p className="text-2xl font-bold text-cyan-300">24/7</p>
                <p className="text-sm text-gray-400">AI Mentor Support</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                <p className="text-2xl font-bold text-purple-300">AI</p>
                <p className="text-sm text-gray-400">Powered Roadmaps</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                <p className="text-2xl font-bold text-pink-300">Free</p>
                <p className="text-sm text-gray-400">To Get Started</p>
              </div>
            </motion.div>

          </motion.div>

          <motion.div initial={{ opacity: 0, x: 120, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex flex-1 items-center justify-center">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4 }}
              className="absolute left-0 top-16 z-20 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              <p className="text-sm text-gray-400">AI Mentor</p>
              <h3 className="mt-1 text-lg font-bold text-cyan-300">Live Guidance</h3>
            </motion.div>

            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5 }}
              className="absolute bottom-10 right-0 z-20 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              <p className="text-sm text-gray-400">Career Match</p>
              <h3 className="mt-1 text-lg font-bold text-purple-300">AI Personalized</h3>
            </motion.div>

            <motion.div animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative h-[500px] w-[500px] flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-[140px]" />
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-[160px]" />
              <div className="relative w-72 h-72 rounded-full border border-purple-500/30 bg-white/5 backdrop-blur-xl flex items-center justify-center drop-shadow-[0_0_80px_rgba(34,211,238,0.35)]">
                <Bot className="w-44 h-44 text-purple-300" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-32">
        <h2 className="mb-16 text-center text-5xl font-bold">Powerful AI Career Engine</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <FloatingFeature title="AI Mentor System" desc="Live AI guidance tailored to your career goals." />
          <FloatingFeature title="Smart Roadmaps" desc="Personalized step-by-step skill-based career paths." />
          <FloatingFeature title="Resume AI" desc="ATS optimization with PDF and DOCX support." />
          <FloatingFeature title="Coding Practice" desc="Real-world interview problem solving by career." />
          <FloatingFeature title="AI Interview" desc="AI-generated questions with instant evaluation." />
          <FloatingFeature title="Adaptive Quizzes" desc="Career-based AI testing with real questions." />
        </div>
      </section>

      {/* AI MENTOR */}
      <section id="mentor" className="mx-auto max-w-7xl px-6 py-32">
        <h2 className="mb-16 text-center text-5xl font-bold">AI Mentor Command Center</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="hidden h-[500px] flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 md:flex">
            <h3 className="text-sm text-gray-400">Recent Topics</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="rounded-xl bg-white/10 p-3">Career Roadmap Help</div>
              <div className="rounded-xl bg-white/10 p-3">Resume Review Tips</div>
              <div className="rounded-xl bg-white/10 p-3">Interview Preparation</div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-2xl" />
            <div className="relative z-10 flex h-[500px] flex-col">
              <div className="mb-4 flex justify-between">
                <span className="text-cyan-300">🤖 AI Mentor Active</span>
                <span className="text-xs text-green-400">● Live</span>
              </div>
              <div className="flex-1 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">You: Help me plan my career path</div>
                <div className="rounded-2xl bg-white/10 p-4">AI: Let's start with your goals and current skills 🚀</div>
              </div>
              <div className="mt-4 flex gap-2">
                <input disabled placeholder="Ask AI Mentor..." className="flex-1 rounded-xl bg-white/10 p-3 outline-none" />
                <button disabled className="rounded-xl bg-purple-500 px-5">Send</button>
              </div>
            </div>
          </div>
          <div className="hidden h-[500px] flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 md:flex">
            <h3 className="text-sm text-gray-400">Suggestions</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="rounded-xl bg-white/10 p-3">Generate Career Roadmap</div>
              <div className="rounded-xl bg-white/10 p-3">Mock Interview</div>
              <div className="rounded-xl bg-white/10 p-3">Improve Resume</div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

function FloatingFeature({ title, desc }: any) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-transparent opacity-60 transition-all duration-500 group-hover:opacity-90" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="relative z-10">
        <h3 className="mb-3 text-3xl font-bold">{title}</h3>
        <p className="text-gray-300">{desc}</p>
      </div>
    </motion.div>
  );
}
