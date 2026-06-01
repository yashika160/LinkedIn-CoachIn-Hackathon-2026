"use client";

import { motion } from "framer-motion";
import { Brain, Route, BarChart3, FileSearch } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Mentor",
    desc: "Personalized AI guidance for career growth and skill development.",
  },
  {
    icon: Route,
    title: "Career Roadmaps",
    desc: "Interactive step-by-step learning paths tailored to your goals.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    desc: "Track readiness, streaks, strengths, and learning performance.",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    desc: "AI-powered resume scoring with ATS optimization insights.",
  },
];

export default function FeatureCard() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">
  Everything Needed For Your <span className="gradient-text">Career Journey</span>
</h2>

          <p className="mt-4 text-gray-400">
            Everything needed to become industry-ready.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="glass rounded-3xl p-8 transition"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20">
                  <Icon className="text-cyan-600 dark:text-cyan-400" size={28} />
                </div>

                <h3 className="text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}