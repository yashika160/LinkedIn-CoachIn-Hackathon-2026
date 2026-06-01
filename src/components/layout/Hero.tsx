"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero-bg grid-bg relative flex min-h-screen items-center justify-center overflow-hidden px-6">

      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 max-w-6xl text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold leading-tight md:text-7xl"
        >
          Build Your
          <span className="gradient-text"> AI-Powered Career </span>
          Journey
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl text-lg text-gray-400 md:text-xl"
        >
          Personalized roadmaps, AI mentors, resume analysis,
          interview prep, skill tracking, and career intelligence —
          all in one futuristic platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >

          <button className="glow rounded-2xl bg-purple-600 px-8 py-4 text-lg font-semibold transition hover:scale-105">
            Start Learning
          </button>

          <button className="glass rounded-2xl px-8 py-4 text-lg font-semibold transition hover:bg-black/10 dark:bg-white/10">
            Explore Dashboard
          </button>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >

          <div className="glass rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
              95%
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Career Readiness
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              120+
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              AI Roadmaps
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
              24/7
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              AI Mentorship
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              10K+
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Students Guided
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}