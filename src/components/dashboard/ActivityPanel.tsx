"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const defaultActions = [
  { text: "Analyze your skill gap", href: "/skill-gap" },
  { text: "Take a quiz to test your knowledge", href: "/quiz" },
  { text: "Practice an AI mock interview", href: "/ai-interview" },
  { text: "Generate a coding challenge", href: "/coding-challenge" },
];

export default function ActivityPanel() {
  const [actions, setActions] = useState<{ text: string; href: string }[]>(defaultActions);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("aiProfile") || "{}");
    const role = localStorage.getItem("userRole") || "";
    const skills = localStorage.getItem("userSkills") || "";

    const next: { text: string; href: string }[] = [];

    // Personalise from AI profile next_steps
    if (profile?.next_steps?.length) {
      profile.next_steps.slice(0, 3).forEach((step: string) => {
        next.push({ text: step, href: "/skill-gap" });
      });
    }

    // Add role-specific suggestions
    if (role) next.push({ text: `Practice ${role} interview questions`, href: "/ai-interview" });
    if (!skills) next.push({ text: "Add your skills for personalized guidance", href: "/settings" });

    next.push({ text: "Try a quiz to sharpen your knowledge", href: "/quiz" });
    next.push({ text: "Generate a coding challenge", href: "/coding-challenge" });

    setActions(next.slice(0, 5));
  }, []);

  return (
    <div className="panel">
      <h2 className="text-xl font-semibold">Next Best Actions</h2>
      <p className="text-xs text-muted-foreground mt-1">Personalised from your AI profile</p>
      <div className="mt-5 space-y-3">
        {actions.map((a, i) => (
          <Link key={i} href={a.href}
            className="flex items-center justify-between p-4 rounded-xl bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border hover:bg-black/10 dark:bg-white/10 hover:border-purple-500/30 transition group">
            <span className="text-sm text-foreground/70 group-hover:text-foreground transition">{a.text}</span>
            <ArrowRight size={14} className="text-muted-foreground group-hover:text-purple-600 dark:text-purple-400 transition flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
