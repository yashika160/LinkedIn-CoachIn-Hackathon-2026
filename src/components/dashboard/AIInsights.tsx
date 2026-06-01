"use client";

import { useEffect, useState } from "react";

type Insight = { title: string; desc: string; color: string };

export default function AIInsights() {
  const [insights, setInsights] = useState<Insight[]>([
    { title: "Complete Onboarding", desc: "Finish your profile to unlock personalised AI insights.", color: "text-cyan-600 dark:text-cyan-300" },
  ]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("aiProfile") || "{}");
    const role = localStorage.getItem("userRole") || "";
    const skills = (localStorage.getItem("userSkills") || "").split(",").filter(Boolean);
    const quizAnswers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");
    const interviewsDone = Number(localStorage.getItem("interviewsDone") || "0");

    const result: Insight[] = [];

    if (profile?.top_careers?.[0]) {
      const top = profile.top_careers[0];
      result.push({
        title: `Best Match: ${top.title}`,
        desc: `${top.match_score}% match · ${top.demand} demand · ${top.time_to_ready} to job-ready`,
        color: "text-purple-600 dark:text-purple-300",
      });
    }

    if (profile?.growth_areas?.length) {
      result.push({
        title: "AI-Detected Skill Gaps",
        desc: `Focus on: ${profile.growth_areas.slice(0, 3).join(", ")}`,
        color: "text-yellow-300",
      });
    }

    if (quizAnswers.length > 0) {
      result.push({
        title: "Quiz Activity",
        desc: `You've completed ${quizAnswers.length} quiz session${quizAnswers.length > 1 ? "s" : ""}. Keep it up!`,
        color: "text-green-300",
      });
    } else {
      result.push({
        title: "Start Your First Quiz",
        desc: `Test your ${role || "technical"} knowledge with AI-generated questions.`,
        color: "text-cyan-600 dark:text-cyan-300",
      });
    }

    if (interviewsDone === 0) {
      result.push({
        title: "Interview Prep Needed",
        desc: "You haven't done a mock interview yet. Start today to build confidence.",
        color: "text-orange-300",
      });
    } else {
      result.push({
        title: "Interview Practice",
        desc: `${interviewsDone} mock interview${interviewsDone > 1 ? "s" : ""} completed. Consistency is key!`,
        color: "text-green-300",
      });
    }

    if (skills.length < 3) {
      result.push({
        title: "Add More Skills",
        desc: "Adding more skills helps AI give you better career matches and gap analysis.",
        color: "text-pink-600 dark:text-pink-300",
      });
    }

    if (profile?.personality_type) {
      result.push({
        title: `You're a ${profile.personality_type}`,
        desc: profile.motivational_quote || "Keep pushing forward!",
        color: "text-cyan-600 dark:text-cyan-300",
      });
    }

    if (result.length === 0) {
      result.push({ title: "Complete Onboarding", desc: "Finish your profile to unlock personalised AI insights.", color: "text-cyan-600 dark:text-cyan-300" });
    }

    setInsights(result);
  }, []);

  return (
    <div className="panel">
      <h2 className="text-xl font-semibold">AI Intelligence Report</h2>
      <p className="text-xs text-muted-foreground mt-1">Powered by your real profile data</p>
      <div className="mt-6 space-y-4">
        {insights.map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border">
            <h3 className={`font-semibold ${item.color}`}>{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
