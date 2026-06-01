"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";

type Props = { size?: number };

export default function CareerRing({ size = 220 }: Props) {
  const [progress, setProgress] = useState(0);
  const [career, setCareer] = useState("Your Career");
  const [label, setLabel] = useState("Complete onboarding to see your match score");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [growthAreas, setGrowthAreas] = useState<string[]>([]);
  const [quote, setQuote] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [role, setRole] = useState("");

  function applyProfile(profile: any, roleStr: string) {
    const topCareer = profile?.top_careers?.[0];
    if (topCareer) {
      setProgress(topCareer.match_score || 0);
      setCareer(topCareer.title || roleStr);
      setLabel(`${topCareer.demand || "High"} demand · ${topCareer.time_to_ready || ""} to job-ready`);
      setHasProfile(true);
    } else if (roleStr) {
      setCareer(roleStr);
      setProgress(0);
      setLabel("AI profile not generated yet");
      setHasProfile(false);
    }
    const hasReal = profile?.top_careers?.length > 0;
    setStrengths(hasReal ? (profile?.strengths || []) : []);
    setGrowthAreas(hasReal ? (profile?.growth_areas || []) : []);
    setQuote(hasReal ? (profile?.motivational_quote || "") : "");
  }

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "";
    setRole(userRole);
    const profile = JSON.parse(localStorage.getItem("aiProfile") || "{}");
    applyProfile(profile, userRole);
  }, []);

  const generateProfile = async () => {
    setRefreshing(true);
    try {
      const name = localStorage.getItem("userName") || "";
      const gmail = localStorage.getItem("userGmail") || localStorage.getItem("userEmail") || "";
      const skillsRaw = localStorage.getItem("userSkills") || "";
      const interestsRaw = localStorage.getItem("userInterests") || "";
      const education = localStorage.getItem("userEducation") || "";

      const skills = skillsRaw.split(",").map((s: string) => s.trim()).filter(Boolean);
      const interests = interestsRaw.split(",").map((s: string) => s.trim()).filter(Boolean);

      const data = await api.onboard({
        name, skills, interests, education,
        experience_years: 0,
        preferred_work_style: "remote",
        email: gmail,
        role,
      });

      if (data) {
        localStorage.setItem("aiProfile", JSON.stringify(data));
        applyProfile(data, role);
        window.dispatchEvent(new Event("profileUpdate"));
      }
    } catch (e) {
      console.error("Failed to generate profile:", e);
    } finally {
      setRefreshing(false);
    }
  };

  const stroke = 12;
  const radius = (size - stroke) / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-col gap-6 w-full rounded-[28px] border border-border bg-white/[0.04] backdrop-blur-xl p-8 overflow-hidden">
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="flex items-center gap-8">
        {/* RING */}
        <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="rotate-[-90deg]">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
            <motion.circle
              cx={size / 2} cy={size / 2} r={radius} fill="none"
              stroke="url(#ringGrad)" strokeWidth={stroke} strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {refreshing ? (
              <Loader2 className="animate-spin w-8 h-8 text-purple-600 dark:text-purple-400" />
            ) : (
              <>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  {progress > 0 ? `${progress}%` : "—"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Match Score</p>
              </>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0 space-y-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Top Career Match</p>
            <h2 className="text-2xl font-black mt-1 truncate">{career}</h2>
            <p className="text-sm text-cyan-600 dark:text-cyan-300 mt-1">{label}</p>
          </div>

          {strengths.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Your Strengths</p>
              <div className="flex flex-wrap gap-2">
                {strengths.slice(0, 3).map((s, i) => (
                  <span key={i} className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs">{s}</span>
                ))}
              </div>
            </div>
          )}

          {growthAreas.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Growth Areas</p>
              <div className="flex flex-wrap gap-2">
                {growthAreas.slice(0, 3).map((s, i) => (
                  <span key={i} className="px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs">{s}</span>
                ))}
              </div>
            </div>
          )}

          {quote && <p className="text-xs text-muted-foreground italic">"{quote}"</p>}

          {/* Show generate button if no profile yet */}
          {!hasProfile && role && (
            <button
              onClick={generateProfile}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs hover:bg-purple-500/30 transition disabled:opacity-50"
            >
              {refreshing ? (
                <><Loader2 size={12} className="animate-spin" /> Generating...</>
              ) : (
                <><RefreshCw size={12} /> Generate AI Match Score</>
              )}
            </button>
          )}

          {/* Refresh button if profile exists */}
          {hasProfile && (
            <button
              onClick={generateProfile}
              disabled={refreshing}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-muted-foreground transition disabled:opacity-50"
            >
              <RefreshCw size={10} />
              {refreshing ? "Refreshing..." : "Refresh score"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
