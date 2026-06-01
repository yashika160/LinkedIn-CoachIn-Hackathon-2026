"use client";

import { motion } from "framer-motion";
import { Brain, Route, BarChart3, FileSearch } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Mentor",
    desc: "Personalized AI guidance for career growth.",
  },
  {
    icon: Route,
    title: "Career Roadmaps",
    desc: "Step-by-step learning paths.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    desc: "Track learning performance.",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    desc: "ATS optimized resume feedback.",
  },
];

export default function DashboardPreview() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-12 text-center text-4xl font-bold">
          Powerful <span className="gradient-text">AI Features</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="glass rounded-3xl p-6"
              >
                <Icon className="mb-4 text-cyan-600 dark:text-cyan-400" size={28} />

                <h3 className="text-xl font-semibold">
                  {f.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}