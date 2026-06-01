"use client";
import { trackActivity } from "@/lib/activity";
import { useEffect, useState } from "react";
import { Loader2, Sparkles, Brain } from "lucide-react";
import { api } from "@/lib/api";

/* Career → Topics mapping for coding challenges */
const CAREER_CODING_TOPICS: Record<string, string[]> = {
  "Software Engineer": ["Arrays","Strings","Linked Lists","Trees","Dynamic Programming","Sorting","HashMaps","Graphs","Math","Recursion","Stack & Queue","Binary Search"],
  "Frontend Developer": ["DOM Manipulation","Event Handling","Async/Promises","Array Methods","Object Operations","Recursion","Sorting","String Processing","Closures","TypeScript Patterns"],
  "Backend Developer": ["Data Structures","Algorithms","Database Queries","REST API Design","Authentication Logic","String Processing","Arrays","Dynamic Programming","System Design Patterns"],
  "Full Stack Developer": ["Arrays","Strings","Async/Promises","Data Structures","Algorithms","Database Queries","Sorting","Dynamic Programming"],
  "Data Scientist": ["Array Operations","Statistics Implementation","Matrix Manipulation","Sorting Algorithms","String Processing","Math Problems","Dynamic Programming","NumPy Patterns","Data Cleaning"],
  "Data Analyst": ["SQL Queries","Data Manipulation","Array Operations","Statistical Functions","String Processing","Sorting","Math Problems","Data Aggregation"],
  "Machine Learning Engineer": ["Matrix Operations","Statistics","Array Manipulation","Dynamic Programming","Graph Algorithms","Math","Recursion","Probability Problems","Optimization"],
  "AI Engineer": ["Array Operations","Probability","Statistics","Matrix Math","String Processing","Graph Problems","Dynamic Programming","Recursion","Math"],
  "Data Engineer": ["SQL Queries","Data Pipeline Logic","Array Processing","String Manipulation","HashMaps","Sorting","Streaming Data","Batch Processing"],
  "DevOps Engineer": ["Bash Scripting","File Operations","Process Management","Networking Logic","String Processing","Sorting","Arrays","System Administration"],
  "Cloud Engineer": ["Infrastructure Logic","Networking","Distributed Systems","Arrays","HashMaps","Sorting","System Design","Cost Optimization Problems"],
  "Mobile Developer": ["UI State Logic","Arrays","Strings","Async Operations","Data Structures","Algorithms","API Handling","Local Storage"],
  "Game Developer": ["Math Problems","Physics Calculations","Arrays","Graph Algorithms","Dynamic Programming","Sorting","Recursion","Geometry"],
  "Product Manager": ["SQL Queries","Data Analysis","Statistics","A/B Testing Logic","Math Problems","User Funnel Analysis"],
};

function getTopicsForCareer(career: string): string[] {
  const key = Object.keys(CAREER_CODING_TOPICS).find(k => k.toLowerCase() === career.toLowerCase().trim());
  if (key) return CAREER_CODING_TOPICS[key];
  const fuzzy = Object.keys(CAREER_CODING_TOPICS).find(k =>
    career.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(career.toLowerCase())
  );
  if (fuzzy) return CAREER_CODING_TOPICS[fuzzy];
  return ["Arrays","Strings","Linked Lists","Trees","Dynamic Programming","Sorting","HashMaps","Graphs","Math","Recursion"];
}

export default function CodingChallengePage() {
  const [career, setCareer] = useState("Software Engineer");
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [challenge, setChallenge] = useState<any>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const r = localStorage.getItem("userRole");
    if (r) setCareer(r);
  }, []);

  useEffect(() => {
    const newTopics = getTopicsForCareer(career);
    setTopics(newTopics);
    setTopic(newTopics[0] || "");
  }, [career]);

  const generate = async () => {
    if (!topic) { alert("Please select a topic"); return; }
    setLoading(true);
    setSubmitted(false);
    setResult(null);
    try {
      const res = await api.challenge({ topic, career, difficulty });
      setChallenge(res);
      trackActivity("coding");
      setCode(res.starter_code?.replace(/\\n/g, "\n") || "");
    } catch { alert("Failed. Is the backend running?"); }
    finally { setLoading(false); }
  };

  const submit = async () => {
    setSubmitted(true);
    try {
      const res = await api.evaluate({
        question: challenge?.problem,
        user_answer: code,
        career,
      });
      setResult(res);
    } catch {}
  };

  return (
    <main className="min-h-screen bg-[#070A12] text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.1),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 mb-6">
            <Brain size={14} /> AI Coding Challenges
          </div>
          <h1 className="text-6xl font-black">Coding <span className="text-cyan-400">Challenge</span></h1>
          <p className="mt-4 text-xl text-white/60">AI-generated problems tailored to your career & topic</p>
        </div>

        {/* CONFIG */}
        <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest">Career</label>
              <input value={career} onChange={e => setCareer(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm outline-none focus:border-purple-500/50"
                placeholder="e.g. Data Scientist, Frontend Developer" />
              <p className="text-xs text-white/30 mt-1">Topics below update based on your career</p>
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest">Difficulty</label>
              <div className="flex gap-2 mt-2">
                {["Easy","Medium","Hard"].map(d => (
                  <button key={d} onClick={() => setDifficulty(d)}
                    className={`flex-1 py-3 rounded-xl border text-sm font-medium transition ${difficulty === d ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/40 hover:border-white/30"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest mb-3 block">
              Topic <span className="text-white/30 normal-case">(for {career})</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map(t => (
                <button key={t} onClick={() => setTopic(t)}
                  className={`px-4 py-2 rounded-xl border text-sm transition ${topic === t ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/50 hover:border-white/30"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button onClick={generate} disabled={loading || !topic}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold flex items-center justify-center gap-2 disabled:opacity-40">
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles size={16} />}
            {loading ? "Generating..." : "Generate Challenge"}
          </button>
        </div>

        {!challenge && !loading && (
          <div className="text-center py-20 text-white/30">
            <Brain className="mx-auto mb-4 w-16 h-16 opacity-30" />
            <p className="text-lg">Configure your challenge and click Generate</p>
          </div>
        )}

        {challenge && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* PROBLEM */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-black">{challenge.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficulty === "Easy" ? "bg-green-500/20 text-green-400" : difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                    {difficulty}
                  </span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{challenge.problem}</p>
              </div>

              {challenge.examples && (
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <h3 className="font-semibold text-sm mb-3 text-cyan-300">Examples</h3>
                  {challenge.examples.map((ex: any, i: number) => (
                    <div key={i} className="mb-3 text-xs space-y-1">
                      <p className="text-white/60"><span className="text-white/40">Input:</span> {ex.input}</p>
                      <p className="text-white/60"><span className="text-white/40">Output:</span> {ex.output}</p>
                      {ex.explanation && <p className="text-white/40 italic">{ex.explanation}</p>}
                    </div>
                  ))}
                </div>
              )}

              {challenge.constraints && (
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <h3 className="font-semibold text-sm mb-2 text-purple-300">Constraints</h3>
                  {(Array.isArray(challenge.constraints) ? challenge.constraints : [challenge.constraints]).map((c: string, i: number) => (
                    <p key={i} className="text-xs text-white/50">• {c}</p>
                  ))}
                </div>
              )}

              {result && (
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <h3 className="font-semibold text-sm mb-3 text-yellow-300">AI Feedback</h3>
                  {result.good?.map((g: string, i: number) => <p key={i} className="text-xs text-green-400 mb-1">✓ {g}</p>)}
                  {result.missing?.map((m: string, i: number) => <p key={i} className="text-xs text-red-400 mb-1">✗ {m}</p>)}
                  {result.tip && <p className="text-xs text-purple-300 italic mt-2">💡 {result.tip}</p>}
                </div>
              )}
            </div>

            {/* CODE EDITOR */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <span className="text-xs text-white/50">Solution Editor</span>
                  <span className="text-xs text-cyan-400">{topic}</span>
                </div>
                <textarea value={code} onChange={e => setCode(e.target.value)} rows={20}
                  className="w-full p-4 bg-transparent text-green-300 font-mono text-sm resize-none outline-none" />
              </div>
              <button onClick={submit} disabled={submitted || !code.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-cyan-500 font-bold flex items-center justify-center gap-2 disabled:opacity-40">
                {submitted ? "✓ Submitted for Review" : "Submit Solution"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
