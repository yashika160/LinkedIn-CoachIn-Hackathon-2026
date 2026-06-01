"use client";

import { useState } from "react";
import { FileText, Link2, BookOpen, TrendingUp, DollarSign, BarChart, Loader2, Copy, Check } from "lucide-react";
import { api } from "@/lib/api";

type Tool = "cover-letter" | "linkedin" | "study-buddy" | "daily-plan" | "salary" | "job-market" | "compare";

export default function CareerToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>("cover-letter");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Cover Letter
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  // LinkedIn
  const [name, setName] = useState("");
  const [careerGoal, setCareerGoal] = useState("");

  // Study Buddy
  const [topic, setTopic] = useState("");
  const [doubt, setDoubt] = useState("");
  const [career, setCareer] = useState("Software Engineer");

  // Daily Plan
  const [planTopic, setPlanTopic] = useState("");
  const [hours, setHours] = useState(2);

  // Salary
  const [salaryCareer, setSalaryCareer] = useState("Data Scientist");
  const [expYears, setExpYears] = useState(0);
  const [city, setCity] = useState("Bangalore");

  // Job Market
  const [marketCareer, setMarketCareer] = useState("Data Scientist");

  // Compare
  const [careerA, setCareerA] = useState("Data Scientist");
  const [careerB, setCareerB] = useState("Software Engineer");
  const [userSkills, setUserSkills] = useState("");

  const copy = (text: string) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const run = async () => {
    setLoading(true); setResult(null);
    try {
      let res;
      if (activeTool === "cover-letter") res = await api.coverLetter({ job_title: jobTitle, company, user_skills: skills.split(",").map(s=>s.trim()), user_experience: experience });
      else if (activeTool === "linkedin") res = await api.linkedinBio({ name, career_goal: careerGoal, skills: skills.split(",").map(s=>s.trim()), experience });
      else if (activeTool === "study-buddy") res = await api.studyBuddy({ topic, user_doubt: doubt, career });
      else if (activeTool === "daily-plan") res = await api.dailyPlan({ topic: planTopic, career, hours });
      else if (activeTool === "salary") res = await api.salary({ career: salaryCareer, experience_years: expYears, city });
      else if (activeTool === "job-market") res = await api.jobMarket({ career: marketCareer });
      else if (activeTool === "compare") res = await api.compare({ career_a: careerA, career_b: careerB, user_skills: userSkills.split(",").map(s=>s.trim()) });
      setResult(res);
    } catch { alert("Failed. Make sure the backend is running."); }
    finally { setLoading(false); }
  };

  const tools = [
    { id: "cover-letter", label: "Cover Letter", icon: FileText },
    { id: "linkedin", label: "LinkedIn Bio", icon: Link2 },
    { id: "study-buddy", label: "Study Buddy", icon: BookOpen },
    { id: "daily-plan", label: "Daily Plan", icon: TrendingUp },
    { id: "salary", label: "Salary Insights", icon: DollarSign },
    { id: "job-market", label: "Job Market", icon: TrendingUp },
    { id: "compare", label: "Compare Careers", icon: BarChart },
  ];

  return (
    <main className="min-h-screen bg-[#070A12] text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_55%)]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black">Career <span className="text-cyan-400">Tools</span></h1>
          <p className="mt-3 text-white/60">AI-powered tools for every stage of your career journey</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tools.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => { setActiveTool(t.id as Tool); setResult(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition ${activeTool === t.id ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/50 hover:border-white/30"}`}>
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl space-y-4">
            {activeTool === "cover-letter" && <>
              <h2 className="font-bold text-lg">Cover Letter Generator</h2>
              <input value={jobTitle} onChange={e=>setJobTitle(e.target.value)} placeholder="Job Title" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company Name" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Skills (comma-separated)" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <textarea value={experience} onChange={e=>setExperience(e.target.value)} rows={3} placeholder="Brief experience summary" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm resize-none outline-none focus:border-purple-500/50" />
            </>}

            {activeTool === "linkedin" && <>
              <h2 className="font-bold text-lg">LinkedIn Bio Writer</h2>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={careerGoal} onChange={e=>setCareerGoal(e.target.value)} placeholder="Career Goal" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Top Skills (comma-separated)" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <textarea value={experience} onChange={e=>setExperience(e.target.value)} rows={2} placeholder="Work experience" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm resize-none outline-none focus:border-purple-500/50" />
            </>}

            {activeTool === "study-buddy" && <>
              <h2 className="font-bold text-lg">Study Buddy</h2>
              <input value={career} onChange={e=>setCareer(e.target.value)} placeholder="Your Career" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic (e.g. Neural Networks)" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <textarea value={doubt} onChange={e=>setDoubt(e.target.value)} rows={3} placeholder="What don't you understand? Ask here..." className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm resize-none outline-none focus:border-purple-500/50" />
            </>}

            {activeTool === "daily-plan" && <>
              <h2 className="font-bold text-lg">7-Day Study Plan</h2>
              <input value={career} onChange={e=>setCareer(e.target.value)} placeholder="Your Career" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={planTopic} onChange={e=>setPlanTopic(e.target.value)} placeholder="Topic to master (e.g. Machine Learning)" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <div>
                <label className="text-white/50 text-xs">Hours per day: {hours}</label>
                <input type="range" min={1} max={8} value={hours} onChange={e=>setHours(Number(e.target.value))} className="w-full mt-1" />
              </div>
            </>}

            {activeTool === "salary" && <>
              <h2 className="font-bold text-lg">Salary Insights</h2>
              <input value={salaryCareer} onChange={e=>setSalaryCareer(e.target.value)} placeholder="Career / Role" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City (e.g. Bangalore)" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <div>
                <label className="text-white/50 text-xs">Experience Years: {expYears}</label>
                <input type="range" min={0} max={15} value={expYears} onChange={e=>setExpYears(Number(e.target.value))} className="w-full mt-1" />
              </div>
            </>}

            {activeTool === "job-market" && <>
              <h2 className="font-bold text-lg">Job Market Analysis</h2>
              <input value={marketCareer} onChange={e=>setMarketCareer(e.target.value)} placeholder="Career / Role" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
            </>}

            {activeTool === "compare" && <>
              <h2 className="font-bold text-lg">Compare Two Careers</h2>
              <input value={careerA} onChange={e=>setCareerA(e.target.value)} placeholder="Career A (e.g. Data Scientist)" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={careerB} onChange={e=>setCareerB(e.target.value)} placeholder="Career B (e.g. Product Manager)" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
              <input value={userSkills} onChange={e=>setUserSkills(e.target.value)} placeholder="Your skills (comma-separated)" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
            </>}

            <button onClick={run} disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold flex items-center justify-center gap-2 disabled:opacity-40">
              {loading ? <><Loader2 className="animate-spin w-4 h-4" /> Processing...</> : "Generate with AI"}
            </button>
          </div>

          {/* RESULT PANEL */}
          <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            {!result && !loading && (
              <div className="h-full flex items-center justify-center text-white/20 text-center">
                <div>
                  <FileText className="mx-auto mb-3 w-12 h-12 opacity-30" />
                  <p>Results will appear here</p>
                </div>
              </div>
            )}
            {loading && (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 text-purple-400" />
              </div>
            )}
            {result && (
              <div className="space-y-4 overflow-auto max-h-[600px]">
                {/* Text results */}
                {(result.cover_letter || result.bio || result.explanation) && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-purple-300">Generated Output</h3>
                      <button onClick={() => copy(result.cover_letter || result.bio || result.explanation)}
                        className="text-xs text-white/40 hover:text-white flex items-center gap-1">
                        {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{result.cover_letter || result.bio || result.explanation}</p>
                  </div>
                )}

                {/* Daily Plan */}
                {result.days && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-purple-300">7-Day Plan for {result.topic}</h3>
                    {result.days.map((d: any) => (
                      <div key={d.day} className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                        <p className="font-semibold text-sm">Day {d.day}: {d.title}</p>
                        {d.tasks?.map((t: string, i: number) => <p key={i} className="text-xs text-white/60 mt-1">• {t}</p>)}
                        {d.checkpoint && <p className="text-xs text-green-400 mt-2">✓ Checkpoint: {d.checkpoint}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Salary */}
                {result.salary_ranges && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-purple-300">Salary Insights — {result.career}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(result.salary_ranges).map(([k, v]) => (
                        <div key={k} className="p-3 rounded-xl border border-white/10 bg-white/[0.03] text-center">
                          <p className="text-xs text-white/40 capitalize">{k.replace(/_/g, " ")}</p>
                          <p className="font-bold text-cyan-300">{v as string}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-white/60">💡 {result.salary_tip}</p>
                    {result.skills_that_increase_salary && (
                      <div>
                        <p className="text-xs text-white/40 mb-2">Skills that boost salary:</p>
                        <div className="flex flex-wrap gap-2">
                          {result.skills_that_increase_salary.map((s: string) => (
                            <span key={s} className="px-2 py-1 rounded-full bg-green-500/20 text-green-300 text-xs">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Job Market */}
                {result.market_score && !result.salary_ranges && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-5xl font-black text-purple-400">{result.market_score}</p>
                      <p className="text-white/40 text-sm">Market Score for {result.career}</p>
                      <p className="text-cyan-300 font-semibold mt-1">{result.demand_trend} Trend · {result.openings_india} openings</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-2">Top Hiring Companies:</p>
                      <div className="flex flex-wrap gap-2">{result.top_hiring_companies?.map((c: string) => <span key={c} className="px-2 py-1 text-xs rounded-full border border-white/10 text-white/60">{c}</span>)}</div>
                    </div>
                    {result.insider_tip && <p className="text-sm text-purple-300 italic">💡 {result.insider_tip}</p>}
                  </div>
                )}

                {/* Career Compare */}
                {result.winner && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 text-center">
                      <p className="text-xs text-white/40 mb-1">Recommended for You</p>
                      <p className="text-2xl font-black text-purple-300">{result.winner}</p>
                      <p className="text-sm text-white/50 mt-1">{result.winner_reason}</p>
                    </div>
                    {result.careers && Object.entries(result.careers).map(([name, data]: [string, any]) => (
                      <div key={name} className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                        <p className="font-bold mb-2">{name}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <p className="text-white/50">Match: <span className="text-white">{data.match_score}%</span></p>
                          <p className="text-white/50">Salary: <span className="text-green-300">{data.salary_range}</span></p>
                          <p className="text-white/50">Demand: <span className="text-white">{data.demand}</span></p>
                          <p className="text-white/50">Months: <span className="text-white">{data.months_to_ready}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
