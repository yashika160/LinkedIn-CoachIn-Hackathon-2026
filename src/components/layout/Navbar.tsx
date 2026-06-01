"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full border-b border-border bg-black/5 dark:bg-black/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold gradient-text">
          SkillAI
        </h1>

        <div className="hidden gap-8 text-sm text-gray-300 md:flex">
          <button className="hover:text-foreground transition">
            Features
          </button>

          <button className="hover:text-foreground transition">
            Dashboard
          </button>

          <button className="hover:text-foreground transition">
            Roadmap
          </button>

          <button className="hover:text-foreground transition">
            AI Mentor
          </button>
        </div>

        <button className="rounded-xl bg-purple-600 px-5 py-2 font-medium transition hover:bg-purple-500">
          Get Started
        </button>

      </div>
    </motion.nav>
  );
}