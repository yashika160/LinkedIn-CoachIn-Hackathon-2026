"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* Per-user data keys that should be cleared when a different user logs in */
const USER_DATA_KEYS = [
  "userRole","userInterests","userSkills","userEducation","userGmail",
  "aiProfile","completedLessons","quizAnswers","interviewsDone",
  "resumeAnalyzed","codingDone","skillGapDone","streakDays","streakLastDate",
  "lastActivity","activityLog","readNotifs","shortGoal","longGoal",
];

// Keys that match dynamic patterns
const USER_DATA_PREFIXES = ["roadmap_v2_", "roadmap_cache_"];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Always start with empty fields — prevent browser autofill carrying over
  useEffect(() => {
    setName("");
    setEmail("");
    setError("");
  }, []);

  const handleLogin = () => {
    const trimName = name.trim();
    const trimEmail = email.trim().toLowerCase();

    if (!trimName || !trimEmail) { setError("Please fill in both fields."); return; }
    if (trimName.length < 2) { setError("Please enter your full name (at least 2 characters)."); return; }
    if (!trimEmail.includes("@") || !trimEmail.includes(".")) { setError("Please enter a valid email address."); return; }

    const existingEmail = localStorage.getItem("userEmail");
    const isNewUser = existingEmail !== trimEmail;

    if (isNewUser) {
      // Clear ALL user-specific data so a new user gets a fresh start
      USER_DATA_KEYS.forEach(k => localStorage.removeItem(k));
      // Clear dynamic keys
      Object.keys(localStorage).forEach(k => {
        if (USER_DATA_PREFIXES.some(prefix => k.startsWith(prefix))) {
          localStorage.removeItem(k);
        }
      });
    }

    localStorage.setItem("userName", trimName);
    localStorage.setItem("userEmail", trimEmail);
    localStorage.setItem("user", JSON.stringify({ email: trimEmail, name: trimName }));

    const alreadyOnboarded = localStorage.getItem("userRole");
    router.push(alreadyOnboarded ? "/dashboard" : "/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_55%)]" />
      <div className="relative w-[440px] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-10 h-10 rounded-xl border border-white/10 overflow-hidden">
            <Image src="/logo.png" alt="logo" fill sizes="40px" className="object-cover scale-125" />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">AIVentra</h1>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Welcome</h2>
          <p className="text-white/40 text-sm mt-1">Sign in to continue your career journey</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest">Full Name</label>
            <input
              placeholder="e.g. Srinivasa Rao"
              autoComplete="off"
              className="w-full mt-2 rounded-xl bg-white/5 border border-white/10 p-4 outline-none focus:border-purple-500/50 transition text-white"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest">Email</label>
            <input
              placeholder="you@example.com"
              type="email"
              autoComplete="off"
              className="w-full mt-2 rounded-xl bg-white/5 border border-white/10 p-4 outline-none focus:border-purple-500/50 transition text-white"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
        </div>
        {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}
        <button onClick={handleLogin} className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 py-4 font-semibold hover:opacity-90 transition">
          Continue →
        </button>
        <p className="text-center text-white/30 text-xs">New here? You'll be taken through onboarding to set up your profile.</p>
      </div>
    </div>
  );
}
