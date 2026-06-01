"use client";
import { trackActivity } from "@/lib/activity";

import { useEffect, useState } from "react";
import { Target, Loader2, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import { validateRole, validateSkills } from "@/lib/validation";

export default function SkillGapPage() {
  const [skills, setSkills] = useState("");
  const [career, setCareer] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    // Only pre-fill career from user profile, never pre-fill skills (user should enter their current skills manually)
    const r = localStorage.getItem("userRole");
    if (r) setCareer(r);
  }, []);

  const analyze = async () => {
    setValidationError("");
    const skillsList = skills.split(",").map(s => s.trim()).filter(Boolean);
    const skillsErr = validateSkills(skills);
    if (skillsErr) { setValidationError(skillsErr); return; }
    const roleErr = validateRole(career);
    if (roleErr) { setValidationError(roleErr); return; }
    setLoading(true);
    try {
      const res = await api.skillGap({ skills: skillsList, target_career: career.trim() });
      setResult(res);
      trackActivity("skillgap");
    } catch { setValidationError("Failed to analyze. Make sure the backend is running."); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#070A12] text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_55%)]" />
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 mb-6">
            <Target size={14} /> Skill Gap Analyzer
          </div>
          <h1 className="text-5xl font-black">Know Your <span className="text-cyan-400">Skill Gap</span></h1>
          <p className="mt-4 text-xl text-white/60">Find exactly what skills you need to land your dream role</p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl space-y-5">
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest">Target Career</label>
            <input value={career} onChange={e => setCareer(e.target.value)}
              placeholder="e.g. Data Scientist, Software Engineer, Product Manager"
              className="w-full mt-2 p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest">Your Current Skills (comma separated)</label>
            <textarea value={skills} onChange={e => setSkills(e.target.value)} rows={3}
              placeholder="Enter your current skills, e.g. Python, SQL, Excel..."
              className="w-full mt-2 p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm resize-none outline-none focus:border-purple-500/50" />
          </div>
          {validationError && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{validationError}</p>}
          <button onClick={analyze} disabled={loading || !skills.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold flex items-center justify-center gap-2 disabled:opacity-40">
            {loading ? <><Loader2 className="animate-spin w-4 h-4" /> Analyzing...</> : "Analyze Skill Gap"}
          </button>
        </div>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.03] text-center">
              <p className="text-white/50 text-sm">Career Readiness</p>
              <p className="text-6xl font-black text-purple-400 mt-2">{result.readiness_percent}%</p>
              <p className="text-white/40 text-sm mt-2">for {result.target_career}</p>
              <div className="w-full bg-white/10 rounded-full h-3 mt-4">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all" style={{ width: `${result.readiness_percent}%` }} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/10">
                <h3 className="font-bold text-green-300 mb-3 flex items-center gap-2"><CheckCircle2 size={16} /> Skills You Have</h3>
                {result.user_has?.map((s: string, i: number) => <p key={i} className="text-white/70 text-sm">✓ {s}</p>)}
              </div>
              <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/10">
                <h3 className="font-bold text-red-300 mb-3 flex items-center gap-2"><AlertCircle size={16} /> Skills You're Missing</h3>
                {result.user_is_missing?.map((s: string, i: number) => <p key={i} className="text-white/70 text-sm">✗ {s}</p>)}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <h3 className="font-bold text-purple-300 mb-4">🎯 Priority Skills to Learn</h3>
              {result.priority_skills?.map((skill: any, i: number) => (
                <div key={i} className="mb-4 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold">{skill.skill}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${skill.importance === "Critical" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>{skill.importance}</span>
                  </div>
                  <p className="text-white/50 text-sm">{skill.why}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-xs text-white/40">⏱ {skill.weeks_to_learn} weeks</p>
                    {skill.link && (
                      <a href={skill.link} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 flex items-center gap-1">
                        {skill.resource} <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
