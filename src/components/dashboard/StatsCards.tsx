"use client";

import { useEffect, useState } from "react";

export default function StatsCards() {
  const [stats, setStats] = useState([
    { title: "Career Readiness", value: "—", trend: "" },
    { title: "Quizzes Taken", value: "0", trend: "" },
    { title: "Interviews Done", value: "0", trend: "" },
    { title: "Streak Days", value: "1", trend: "" },
  ]);

  useEffect(() => {
    const updateStats = () => {
      const profile = JSON.parse(localStorage.getItem("aiProfile") || "{}");
      const quizAnswers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");
      const interviewsDone = Number(localStorage.getItem("interviewsDone") || "0");
      const streakDays = Number(localStorage.getItem("streakDays") || "0");

      const topMatch = profile?.top_careers?.[0]?.match_score;
      const readiness = topMatch !== undefined ? `${topMatch}%` : "—";

      setStats([
        { title: "Career Readiness", value: readiness, trend: topMatch !== undefined ? "AI-matched" : "Complete onboarding" },
        { title: "Quizzes Taken", value: String(quizAnswers.length || 0), trend: "total attempts" },
        { title: "Interviews Done", value: String(interviewsDone), trend: "practice sessions" },
        { title: "Streak Days", value: streakDays === 0 ? "—" : String(streakDays), trend: streakDays === 0 ? "Start learning to begin streak" : "days active" },
      ]);
    };

    updateStats();
    window.addEventListener("profileUpdate", updateStats);
    return () => window.removeEventListener("profileUpdate", updateStats);
  }, []);

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="panel hover:scale-[1.02] transition">
          <p className="text-muted-foreground text-sm">{stat.title}</p>
          <h1 className="mt-3 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            {stat.value}
          </h1>
          <p className="mt-3 text-xs text-green-600 dark:text-green-400">{stat.trend}</p>
        </div>
      ))}
    </section>
  );
}
