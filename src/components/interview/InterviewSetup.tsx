"use client";

import { useEffect, useState } from "react";
import { Briefcase, BarChart3, Clock, Sparkles } from "lucide-react";

export default function InterviewSetup({
  role,
  setRole,
  level,
  setLevel,
  type,
  setType,
  duration,
  setDuration,
  startInterview,
}: any) {

  const [override, setOverride] = useState(false);

  // AUTO LOAD ROLE FROM ONBOARDING
  useEffect(() => {
    const saved = localStorage.getItem("userRole");
    if (saved) setRole(saved);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border p-8 rounded-3xl space-y-6">

      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          AI Interview Setup
        </h2>
      </div>

      {/* ROLE */}
      <div>
        <label className="text-sm text-gray-400">Role</label>

        {!override ? (
          <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-black/30 border border-border rounded-xl">
            <span>{role || "No role found"}</span>
            <button
              onClick={() => setOverride(true)}
              className="text-purple-600 dark:text-purple-400"
            >
              Change
            </button>
          </div>
        ) : (
          <select
            className="w-full p-3 bg-black/5 dark:bg-black/30 border border-border rounded-xl"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Analyst</option>
            <option>AI/ML Engineer</option>
          </select>
        )}
      </div>

      {/* LEVEL */}
      <select
        className="w-full p-3 bg-black/5 dark:bg-black/30 border border-border rounded-xl"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="">Select Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      {/* TYPE */}
      <select
        className="w-full p-3 bg-black/5 dark:bg-black/30 border border-border rounded-xl"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option>Technical</option>
        <option>HR</option>
        <option>Mixed</option>
      </select>

      {/* DURATION */}
      <select
        className="w-full p-3 bg-black/5 dark:bg-black/30 border border-border rounded-xl"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      >
        <option value="5">5 min</option>
        <option value="10">10 min</option>
        <option value="15">15 min</option>
      </select>

      {/* START */}
      <button
        onClick={startInterview}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-semibold"
      >
        Start Interview
      </button>

    </div>
  );
}