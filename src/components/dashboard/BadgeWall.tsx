"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Brain, Trophy, Code2, Lock, FileText, Target } from "lucide-react";

type Props = { compact?: boolean };

type Badge = { title: string; icon: any; unlocked: boolean; glow: string; desc: string };

export default function BadgeWall({ compact = false }: Props) {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const streakDays = Number(localStorage.getItem("streakDays") || "1");
    const quizAnswers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");
    const interviewsDone = Number(localStorage.getItem("interviewsDone") || "0");
    const resumeAnalyzed = Boolean(localStorage.getItem("resumeAnalyzed"));
    const skillGapDone = Boolean(localStorage.getItem("skillGapDone"));
    const codingDone = Boolean(localStorage.getItem("codingDone"));

    setBadges([
      { title: "Streak", icon: Flame, unlocked: streakDays >= 1, glow: "from-orange-400 to-red-500", desc: `${streakDays} day${streakDays !== 1 ? "s" : ""}` },
      { title: "Quiz Pro", icon: Brain, unlocked: quizAnswers.length >= 1, glow: "from-cyan-400 to-blue-500", desc: `${quizAnswers.length} quiz${quizAnswers.length !== 1 ? "zes" : ""}` },
      { title: "Interviewer", icon: Trophy, unlocked: interviewsDone >= 1, glow: "from-yellow-400 to-orange-500", desc: `${interviewsDone} session${interviewsDone !== 1 ? "s" : ""}` },
      { title: "Coder", icon: Code2, unlocked: codingDone, glow: "from-purple-400 to-pink-500", desc: codingDone ? "Unlocked" : "Solve a challenge" },
      { title: "Resume", icon: FileText, unlocked: resumeAnalyzed, glow: "from-green-400 to-teal-500", desc: resumeAnalyzed ? "Analyzed" : "Analyze resume" },
      { title: "Gap Hunter", icon: Target, unlocked: skillGapDone, glow: "from-pink-400 to-rose-500", desc: skillGapDone ? "Unlocked" : "Run skill gap" },
    ]);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {!compact && <h2 className="text-xl font-semibold mb-4">Achievements</h2>}
      <div className={`grid gap-4 flex-1 ${compact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition
                ${b.unlocked ? "border-white/20 bg-white/[0.06]" : "border-border bg-card opacity-50"}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${b.unlocked ? `bg-gradient-to-br ${b.glow}` : "bg-black/10 dark:bg-white/10"}`}>
                {b.unlocked ? <Icon size={18} className="text-foreground" /> : <Lock size={16} className="text-muted-foreground" />}
              </div>
              <p className="text-xs font-semibold">{b.title}</p>
              <p className="text-xs text-muted-foreground">{b.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
